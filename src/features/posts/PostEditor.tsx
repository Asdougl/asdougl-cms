import type { Author } from '@prisma/client'
import { PostStatus } from '@prisma/client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import classNames from 'classnames'
import { Listbox } from '@headlessui/react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCakeCandles,
  faChevronDown,
  faGlobe,
  faPencil,
  faQuestionCircle,
} from '@fortawesome/pro-regular-svg-icons'
import Link from 'next/link'
import dayjs from 'dayjs'
import Image from 'next/image'
import { AnchorButton, Button } from '../../components/Button'
import { Anchor } from '../../components/Anchor'
import { MiniLoader } from '../../components/Loader'
import type { inferQueryOutput } from '../../utils/trpc'
import { trpc } from '../../utils/trpc'
import { clientEnv } from '../../env/schema.mjs'
import { Textarea } from '../../components/Textarea'
import { timeSince } from '../../utils/helpers'
import { DATE_TIME_FORMAT } from '../../utils/constants'
import { StatusPicker } from './components/StatusPicker'

interface PostEditorProps {
  post?: Exclude<inferQueryOutput<'post.getOnePost'>, null>
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
  content: z.string().min(1, 'Content is required').default('hello world'),
  status: z.nativeEnum(PostStatus).default('DRAFT'),
  authorId: z.string().min(1, 'Author is required').nullish(),
  summary: z.string().min(1, 'Summary is required'),
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

  const [author, setAuthor] = useState(post?.author || null)
  const [status, setStatus] = useState<PostStatus>(post?.status || 'DRAFT')

  const onSubmit = handleSubmit((data) => {
    onSuccess(data)
  })
  const { data } = trpc.useQuery(['author.getAuthors'])

  const changeAuthor = (author: Author) => {
    setValue('authorId', author.id)
    setAuthor(author)
  }

  const changeStatus = (status: PostStatus) => {
    setValue('status', status)
    setStatus(status)
  }

  const createdAt = dayjs(post?.createdAt)
  const updatedAt = dayjs(post?.updatedAt)
  const publishedAt = dayjs(post?.publishedAt)

  return (
    <form onSubmit={onSubmit} className="container mx-auto flex flex-col gap-4">
      <div className="flex flex-col items-stretch divide-x divide-background rounded-2xl bg-accent lg:flex-row">
        <StatusPicker status={status} onChange={changeStatus} />
        <div className="flex flex-col items-start justify-center gap-1 px-4 focus-within:bg-slate-700">
          <label htmlFor="slug" className="flex gap-1 font-mono">
            <div
              className={classNames('opacity-60', {
                'text-error-400': errors.slug,
              })}
            >
              /
            </div>
            <input
              id="slug"
              {...register('slug')}
              className="bg-transparent focus:outline-none"
            />
          </label>
        </div>
        {data ? (
          <Listbox
            value={author}
            onChange={changeAuthor}
            as="div"
            className="relative py-1 px-4"
          >
            <Listbox.Button className="flex h-full items-center gap-2 bg-accent px-1 py-2">
              {author?.image ? (
                <Image
                  src={`${clientEnv.NEXT_PUBLIC_S3_PATH}${author.image}`}
                  alt=""
                  height="24"
                  width="24"
                  className="rounded-full"
                />
              ) : (
                <FontAwesomeIcon icon={faQuestionCircle} className="h-6 w-6" />
              )}
              {author?.name || 'Select an Author'}
              <FontAwesomeIcon icon={faChevronDown} className="pl-4" />
            </Listbox.Button>
            <Listbox.Options className="absolute top-[calc(100%+0.5rem)] left-0 z-10 w-full rounded-2xl bg-accent shadow-lg">
              {data.map((author) => (
                <Listbox.Option
                  key={author.id}
                  value={author}
                  disabled={!author.public}
                  className={classNames(
                    'flex items-center gap-2 divide-y divide-standard-800 rounded-lg px-4 py-2',
                    !author.public ? 'opacity-70' : 'hover:bg-primary-400'
                  )}
                >
                  {author.image ? (
                    <Image
                      src={`${clientEnv.NEXT_PUBLIC_S3_PATH}${author.image}`}
                      alt=""
                      height="24"
                      width="24"
                      className="rounded-full"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faQuestionCircle}
                      className="h-6 w-6"
                    />
                  )}
                  {author.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        ) : (
          <div className="flex items-center justify-center px-4">
            <MiniLoader />
          </div>
        )}
      </div>
      {post && (
        <div className="flex flex-col gap-6 text-sm lg:flex-row lg:items-center">
          <div className="flex items-baseline gap-1">
            <FontAwesomeIcon icon={faCakeCandles} fixedWidth />
            <div className="text-base">
              {createdAt.format(DATE_TIME_FORMAT)}
            </div>
            <div className="text-sm opacity-70">
              {timeSince(createdAt.toDate())}
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <FontAwesomeIcon icon={faPencil} fixedWidth />
            <div className="text-base">
              {updatedAt.format(DATE_TIME_FORMAT)}
            </div>
            <div className="text-sm opacity-70">
              {timeSince(updatedAt.toDate())}
            </div>
          </div>
          {post.status === 'PUBLISHED' && (
            <div className="flex items-baseline gap-1">
              <FontAwesomeIcon icon={faGlobe} fixedWidth />
              <div className="text-base">
                {publishedAt.format(DATE_TIME_FORMAT)}
              </div>
              <div className="text-sm opacity-70">
                {timeSince(publishedAt.toDate())}
              </div>
            </div>
          )}
        </div>
      )}
      <input
        id="title"
        {...register('title')}
        className={classNames(
          'w-full bg-transparent font-display text-5xl font-black focus:outline-none',
          errors.title?.message
            ? 'border-error-200 focus:border-error-300'
            : 'border-standard-200 focus:border-primary-400 dark:border-standard-600'
        )}
      />

      <div>
        <Textarea
          label="Summary"
          {...register('summary')}
          className="bg-primary-400/10"
        ></Textarea>
      </div>
      <div className="flex flex-col">
        <Textarea
          label="Content"
          {...register('content')}
          className="h-96 bg-primary-400/10 px-6 py-4 font-mono text-lg"
        />
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
      </div>
      <div className="flex gap-4 pt-6">
        <Button category="primary" disabled={loading} type="submit">
          {loading ? <MiniLoader /> : 'Save'}
        </Button>
        <Link href="/posts">
          <AnchorButton type="button" category="secondary">
            Back
          </AnchorButton>
        </Link>
      </div>
    </form>
  )
}
