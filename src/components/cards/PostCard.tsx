import { faGlobe } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import Link from 'next/link'
import { DATE_TIME_FORMAT } from '../../utils/constants'
import type { inferQueryOutput } from '../../utils/trpc'

interface PostCardProps {
  post: Exclude<inferQueryOutput<'post.getAllPosts'>, null>[number]
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <a className="flex w-full flex-col items-start justify-between rounded-lg border-2 border-standard-200 px-4 py-2 hover:bg-slate-50 dark:border-standard-600 dark:hover:bg-slate-800 md:flex-row md:items-center">
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faGlobe}
              className={
                post.status !== 'PUBLISHED'
                  ? 'text-error-400'
                  : 'text-success-400'
              }
            />
            <div className="font-display text-xl font-bold">{post.title}</div>
            <div className="font-mono opacity-70">/{post.slug}</div>
          </div>
          <div className="text-sm opacity-70">
            {dayjs(post.updatedAt).format(DATE_TIME_FORMAT)}
          </div>
        </div>
        <div className="flex">by {post.author?.name || 'Unknown'}</div>
      </a>
    </Link>
  )
}
