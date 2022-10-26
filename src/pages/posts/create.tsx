import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { PageLayout } from '../../layout/PageLayout'
import { trpc } from '../../utils/trpc'
import { PostEditor } from '../../features/posts/PostEditor'

const Posts: NextPage = () => {
  const router = useRouter()
  const utils = trpc.useContext()
  const { mutate, isLoading } = trpc.useMutation(['post.createPost'], {
    onSuccess: (data) => {
      utils.invalidateQueries(['post.getAllPosts'])
      router.push(`/posts/${data.id}`)
    },
  })
  return (
    <PageLayout title={['Posts', 'Create Post']}>
      <PostEditor onSuccess={mutate} loading={isLoading} />
    </PageLayout>
  )
}

export default Posts
