import { faPlus } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Link from 'next/link'
import { AnchorButton } from '../../components/Button'
import { AuthorCard } from '../../components/cards/AuthorCard'
import { FullLoader } from '../../components/Loader'
import { PageLayout } from '../../layout/PageLayout'
import { trpc } from '../../utils/trpc'

const Authors: NextPage = () => {
  const { data, status, error } = trpc.useQuery(['author.getAuthors'])

  return (
    <PageLayout title="Authors">
      {status === 'loading' ? (
        <FullLoader />
      ) : status === 'success' ? (
        <div className="flex flex-col items-start gap-2">
          <Link href="/authors/create">
            <AnchorButton>
              <FontAwesomeIcon icon={faPlus} />
              <span className="pl-2">Create Post</span>
            </AnchorButton>
          </Link>
          {data.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <span>{error?.message || 'unknown error ocurred'}</span>
      )}
    </PageLayout>
  )
}

export default Authors
