import {
  faCalendarCirclePlus,
  faGlobe,
  faPen,
  faPenClip,
  faTrashAlt,
} from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import Link from 'next/link'
import { AuthorProfile } from '../components/AuthorProfile'
import { AnchorButton, Button } from '../components/Button'
import { MiniLoader } from '../components/Loader'
import { Markdown } from '../components/Markdown'
import { DATE_TIME_FORMAT } from '../utils/constants'
import type { inferQueryOutput } from '../utils/trpc'
import { trpc } from '../utils/trpc'

interface PostPreviewProps {
  post: Exclude<inferQueryOutput<'post.getOnePost'>, null>
}

export const PostPreview = ({ post }: PostPreviewProps) => {
  const utils = trpc.useContext()
  const { mutate, isLoading } = trpc.useMutation(['post.updateOnePost'], {
    onSuccess: () => {
      utils.invalidateQueries(['post.getOnePost', post.id])
    },
  })

  const published = post.status === 'PUBLISHED'

  const updateFlag =
    published && dayjs(post.updatedAt).isAfter(dayjs(post.publishedAt), 'hour')

  return (
    <div className="flex flex-col pt-6">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4 pb-8">
          <div className="flex items-center gap-2 font-mono opacity-70">
            <FontAwesomeIcon
              icon={faGlobe}
              fixedWidth
              size="sm"
              className={published ? 'text-success-400' : 'text-error-400'}
            />
            /{post.slug}
          </div>
          <h1 className="font-display text-5xl font-black">{post.title}</h1>
          <div className="flex items-baseline gap-4">
            <div className="text-sm opacity-70">
              <FontAwesomeIcon icon={faCalendarCirclePlus} fixedWidth /> Created
            </div>
            <div className="text-lg">
              {dayjs(post.createdAt).format(DATE_TIME_FORMAT)}
            </div>
          </div>
          <div className="flex items-baseline gap-4">
            <div className="text-sm opacity-70">
              <FontAwesomeIcon icon={faPenClip} fixedWidth /> Last Modified
            </div>
            <div className="text-lg">
              {dayjs(post.updatedAt).format(DATE_TIME_FORMAT)}
              {updateFlag && '*'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AuthorProfile author={post.author} />
          </div>
          <div className="flex w-full flex-col gap-4 md:w-auto md:flex-row md:gap-2">
            <Button
              category="primary"
              disabled={isLoading}
              onClick={() => mutate({ id: post.id, status: 'PUBLISHED' })}
            >
              {isLoading ? (
                <>
                  <MiniLoader />{' '}
                  {published ? 'Unpublishing...' : 'Publishing...'}
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faGlobe} size="sm" />{' '}
                  {published ? 'Unpublish' : 'Publish'}
                </>
              )}
            </Button>
            <Link href={`/posts/${post.id}/edit`}>
              <AnchorButton category="secondary">
                <FontAwesomeIcon icon={faPen} size="sm" /> Edit
              </AnchorButton>
            </Link>
            <Button category="dangerous">
              <FontAwesomeIcon icon={faTrashAlt} size="sm" /> Delete
            </Button>
          </div>
        </div>
        <div className="mx-auto">
          <article className="prose prose-invert max-w-none prose-headings:font-display prose-p:text-justify prose-code:font-mono prose-pre:overflow-visible prose-pre:overflow-x-auto">
            <Markdown>{post.content}</Markdown>
          </article>
        </div>
      </div>
    </div>
  )
}
