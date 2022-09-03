import { faPlus } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import { AnchorButton, Button } from '../../components/Button'
import { PostCard } from '../../components/cards/PostCard'
import { FullLoader } from '../../components/Loader'
import { NewPostModal } from '../../components/modals/NewPostModal'
import { PageLayout } from '../../layout/PageLayout'
import { trpc } from '../../utils/trpc'

const Posts: NextPage = () => {
  const { data, status, error } = trpc.useQuery(['post.getAllPosts'])

  const [showNewPost, setShowNewPost] = useState(false)

  return (
    <PageLayout
      title="Posts"
      actions={
        data ? (
          <Button onClick={() => setShowNewPost(true)}>
            <FontAwesomeIcon icon={faPlus} />
            <span className="pl-2">Create Post</span>
          </Button>
        ) : null
      }
    >
      {status === 'loading' ? (
        <FullLoader />
      ) : status === 'success' ? (
        <div className="flex flex-col items-start gap-2">
          <div className="pb-6"></div>
          {data.length ? (
            data.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div>No Posts...</div>
          )}
        </div>
      ) : (
        <span>{error?.message || 'unknown error ocurred'}</span>
      )}
      <NewPostModal open={showNewPost} onClose={() => setShowNewPost(false)} />
    </PageLayout>
  )
}

export default Posts
