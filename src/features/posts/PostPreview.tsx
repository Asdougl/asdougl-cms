import classNames from 'classnames'
import type { inferQueryOutput } from '../../utils/trpc'
import { StatusPicker } from './components/StatusPicker'

interface PostPreviewProps {
  post: Exclude<inferQueryOutput<'post.getOnePost'>, null>
}

export const PostPreview = ({ post }: PostPreviewProps) => {
  return (
    <div className="container mx-auto flex flex-col gap-4">
      <StatusPicker status={post.status} disabled />
      <div className="flex flex-col items-start gap-1">
        <label htmlFor="slug" className="text-sm opacity-70">
          URL Slug
        </label>
        <div className="flex items-center gap-1 px-1 font-mono">
          <div>/</div>
          <span>{post.slug}</span>
        </div>
      </div>
    </div>
  )
}
