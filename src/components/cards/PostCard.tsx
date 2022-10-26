import dayjs from 'dayjs'
import Link from 'next/link'
import { DATE_TIME_FORMAT } from '../../utils/constants'
import type { inferQueryOutput } from '../../utils/trpc'
import { StatusTag } from '../StatusTag'

interface PostCardProps {
  post: Exclude<inferQueryOutput<'post.getAllPosts'>, null>[number]
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <a className="flex w-full flex-col items-start justify-between rounded-2xl px-4 py-4 hover:bg-accent">
        <StatusTag status={post.status} />
        <div className="flex w-full items-baseline justify-between">
          <div>
            <div className="pt-2 font-display text-5xl font-black">
              {post.title}
            </div>
            <div className="flex opacity-70">
              {post.author?.name || 'Unknown'}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="font-mono opacity-70">/{post.slug}</div>
            <div className="text-sm opacity-70">
              {dayjs(post.updatedAt).format(DATE_TIME_FORMAT)}
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}
