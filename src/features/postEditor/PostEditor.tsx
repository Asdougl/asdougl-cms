import type { Author } from '@prisma/client'
import { PostStatus } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import classNames from 'classnames'
import { Listbox, RadioGroup } from '@headlessui/react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faChevronDown,
  faCircle,
} from '@fortawesome/pro-regular-svg-icons'
import Link from 'next/link'
import { AnchorButton, Button } from '../../components/Button'
import { Anchor } from '../../components/Anchor'
import { MiniLoader } from '../../components/Loader'
import type { inferQueryOutput } from '../../utils/trpc'
import { trpc } from '../../utils/trpc'
import { clientEnv } from '../../env/schema.mjs'

interface PostEditorProps {
  post: Exclude<inferQueryOutput<'post.getOnePost'>, null>
  onSuccess: (data: PostData) => void
  loading?: boolean
}

const PostData = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z
    .string()
    .min(1, 'URL slug is required')
    .regex(
      /^([a-z0-9_-]*)$/,
      'Slug can only contain lower case alphanumeric, underscore and hyphens'
    ),
  content: z.string().min(1, 'Content is required'),
  status: z.nativeEnum(PostStatus),
  authorId: z.string().min(1, 'Author is required').nullish(),
})
type PostData = z.infer<typeof PostData>

export const PostEditor = ({ onSuccess, loading, post }: PostEditorProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PostData>({
    resolver: zodResolver(PostData),
    defaultValues: post,
  })

  const [author, setAuthor] = useState(post.author)
  const [status, setStatus] = useState<PostStatus>(post.status || 'DRAFT')

  const onSubmit = handleSubmit(onSuccess)
  const { data } = trpc.useQuery(['author.getAuthors'])

  const changeAuthor = (author: Author) => {
    setValue('authorId', author.id)
    setAuthor(author)
  }

  const changeStatus = (status: PostStatus) => {
    setValue('status', status)
    setStatus(status)
  }

  return (
    <form onSubmit={onSubmit} className="container mx-auto flex flex-col gap-4">
      <div className="flex flex-col items-start gap-2">
        <label htmlFor="slug" className="text-sm opacity-70">
          Status
        </label>
        <RadioGroup
          value={status}
          onChange={changeStatus}
          className="flex rounded-xl bg-slate-800 p-2"
        >
          <RadioGroup.Option
            value={PostStatus.DRAFT}
            className={({ checked }) =>
              `cursor-pointer rounded-lg px-4 py-2 ring-primary-200/20 transition-colors focus:ring ${
                checked ? 'bg-primary-400 text-slate-800 shadow-md' : ''
              }`
            }
          >
            {({ checked }) => (
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={checked ? faCheckCircle : faCircle} />
                Draft
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option
            value={PostStatus.REVIEW}
            className={({ checked }) =>
              `cursor-pointer rounded-lg px-4 py-2 ring-primary-200/20 transition-colors focus:ring ${
                checked ? 'bg-primary-400 shadow-md' : ''
              }`
            }
          >
            {({ checked }) => (
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={checked ? faCheckCircle : faCircle} />
                Review
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option
            value={PostStatus.PUBLISHED}
            className={({ checked }) =>
              `cursor-pointer rounded-lg px-4 py-2 ring-primary-200/20 transition-colors focus:ring ${
                checked ? 'bg-primary-400 shadow-md' : ''
              }`
            }
          >
            {({ checked }) => (
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={checked ? faCheckCircle : faCircle} />
                Published
              </span>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option
            value={PostStatus.ARCHIVED}
            className={({ checked }) =>
              `cursor-pointer rounded-lg px-4 py-2 ring-primary-200/20 transition-colors focus:ring ${
                checked ? 'bg-primary-400 shadow-md' : ''
              }`
            }
          >
            {({ checked }) => (
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={checked ? faCheckCircle : faCircle} />
                Archived
              </span>
            )}
          </RadioGroup.Option>
        </RadioGroup>
      </div>
      <div className="flex flex-col items-start gap-1">
        <label htmlFor="slug" className="text-sm opacity-70">
          URL Slug
        </label>
        <label
          htmlFor="slug"
          className={classNames(
            'flex gap-1 border-b px-1 font-mono',
            errors.slug?.message
              ? 'border-error-200 focus-within:border-error-300'
              : 'border-standard-200 focus-within:border-primary-400 dark:border-standard-600'
          )}
        >
          <div>/</div>
          <input
            id="slug"
            {...register('slug')}
            className="bg-transparent focus:outline-none"
          />
        </label>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm opacity-70">
          Title
        </label>
        <input
          id="title"
          {...register('title')}
          className={classNames(
            'border-b bg-transparent font-display text-4xl font-bold focus:outline-none',
            errors.title?.message
              ? 'border-error-200 focus:border-error-300'
              : 'border-standard-200 focus:border-primary-400 dark:border-standard-600'
          )}
        />
      </div>
      <div className="flex flex-col items-start">
        {data ? (
          <Listbox
            value={author}
            onChange={changeAuthor}
            as="div"
            className="relative py-1"
          >
            <Listbox.Button className="flex items-center gap-2 border-b border-standard-200 px-1 py-2 dark:border-standard-600">
              {author?.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`${clientEnv.NEXT_PUBLIC_S3_PATH}${author?.image}`}
                  alt=""
                  className="h-6 w-6 rounded-full"
                />
              )}
              {author?.name || 'Select an Author'}
              <FontAwesomeIcon icon={faChevronDown} className="pl-4" />
            </Listbox.Button>
            <Listbox.Options className="absolute top-full left-0 z-10 w-full rounded-lg border border-standard-600 bg-standard-200 shadow-lg dark:bg-standard-900">
              {data.map((author) => (
                <Listbox.Option
                  key={author.id}
                  value={author}
                  disabled={!author.public}
                  className={classNames(
                    'flex items-center gap-2 divide-y divide-standard-800 rounded-lg px-1 py-2 hover:bg-primary-400',
                    { 'opacity-79': !author.public }
                  )}
                >
                  {author.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`${clientEnv.NEXT_PUBLIC_S3_PATH}${author?.image}`}
                      alt=""
                      className="h-6 w-6 rounded-full"
                    />
                  )}
                  {author.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        ) : (
          <MiniLoader />
        )}
      </div>
      <div>
        <div className="py-4 text-xs text-slate-700 dark:text-slate-400">
          We use{' '}
          <Anchor
            target="_blank"
            external
            href="https://www.markdownguide.org/basic-syntax/"
          >
            Markdown
          </Anchor>
        </div>
        <textarea
          className="min-h-[600px] w-full border-l border-transparent bg-transparent px-4 py-1 focus:border-primary-400 focus:outline-none"
          placeholder="Post content"
          {...register('content')}
        ></textarea>
      </div>
      <div className="flex gap-4 pt-6">
        <Button category="primary" disabled={loading}>
          {loading ? <MiniLoader /> : 'Save'}
        </Button>
        <Link href="/posts">
          <AnchorButton type="button">Cancel</AnchorButton>
        </Link>
      </div>
    </form>
  )
}
