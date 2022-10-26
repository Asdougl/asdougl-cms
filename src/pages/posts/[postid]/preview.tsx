import isArray from 'lodash/isArray'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FullLoader } from '../../../components/Loader'
import { PostPreview as PostPreviewNew } from '../../../features/posts/PostPreview'
import { PostPreview } from '../../../features/PostPreview'
import { PageLayout } from '../../../layout/PageLayout'
import { trpc } from '../../../utils/trpc'

const Post: NextPage = () => {
  const {
    query: { postid },
  } = useRouter()
  const { data, status, error } = trpc.useQuery([
    'post.getOnePost',
    (isArray(postid) ? postid[0] : postid) || '',
  ])

  return (
    <PageLayout title={data ? ['Posts', data.title] : 'Posts'}>
      {status === 'loading' ? (
        <FullLoader />
      ) : status === 'success' ? (
        <div>
          {data ? (
            <>
              <PostPreviewNew post={data} />
              <PostPreview post={data} />
            </>
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
