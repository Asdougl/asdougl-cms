import { faNewspaper } from '@fortawesome/pro-regular-svg-icons'
import type { NextPage } from 'next'
import { useState } from 'react'
import { PostCard } from '../../components/cards/PostCard'
import { FullLoader } from '../../components/Loader'
import { PageSearch } from '../../components/PageSearch'
import { PageLayout } from '../../layout/PageLayout'
import { trpc } from '../../utils/trpc'

const Posts: NextPage = () => {
  const [search, setSearch] = useState<string>()
  const [page] = useState(0)
  const { data, status, error } = trpc.useQuery([
    'post.getAllPosts',
    { search, page },
  ])

  return (
    <PageLayout title="Posts">
      <PageSearch
        onSearch={setSearch}
        createRoute="/posts/create"
        ctxIcon={faNewspaper}
      />
      {status === 'loading' ? (
        <FullLoader />
      ) : status === 'success' ? (
        <div className="flex flex-col items-start gap-6 pt-4">
          {data.length ? (
            data.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div>No Posts...</div>
          )}
        </div>
      ) : (
        <span>{error?.message || 'unknown error ocurred'}</span>
      )}
    </PageLayout>
  )
}

export default Posts
