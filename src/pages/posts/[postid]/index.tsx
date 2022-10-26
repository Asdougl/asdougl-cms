import isArray from 'lodash/isArray'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PostEditor } from '../../../features/posts/PostEditor'
import { Loader } from '../../../components/Loader'
import { PageLayout } from '../../../layout/PageLayout'
import { trpc } from '../../../utils/trpc'

const Post: NextPage = () => {
  const utils = trpc.useContext()
  const {
    query: { postid },
    push,
  } = useRouter()
  const realPostId = (isArray(postid) ? postid[0] : postid) || ''
  const { data, status, error } = trpc.useQuery(['post.getOnePost', realPostId])
  const { mutate, isLoading } = trpc.useMutation(['post.updateOnePost'], {
    onSuccess: (data) => {
      utils.invalidateQueries(['post.getOnePost', data.id])
      utils.invalidateQueries(['post.getAllPosts'])
      push(`/posts/${data.id}`)
    },
  })

  return (
    <PageLayout title={data ? ['Posts', data.title] : 'Posts'}>
      {status === 'loading' ? (
        <Loader />
      ) : status === 'success' ? (
        <div>
          {data ? (
            <PostEditor
              post={data}
              onSuccess={(edited) => mutate({ ...edited, id: realPostId })}
              loading={isLoading}
            />
          ) : (
            <div>Post not found!</div>
          )}
        </div>
      ) : (
        <span>{error?.message || 'unknown error ocurred'}</span>
      )}
    </PageLayout>
  )
}

export default Post
