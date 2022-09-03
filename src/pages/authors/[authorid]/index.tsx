import type { NextPage } from 'next'
import isArray from 'lodash/isArray'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { PageLayout } from '../../../layout/PageLayout'
import { trpc } from '../../../utils/trpc'
import { FullLoader } from '../../../components/Loader'

const ViewAuthor: NextPage = () => {
  const {
    query: { authorid },
  } = useRouter()
  const parsedAuthorId = (isArray(authorid) ? authorid[0] : authorid) || ''
  const { data, status, error } = trpc.useQuery([
    'author.getAuthorWithPosts',
    parsedAuthorId,
  ])

  return (
    <PageLayout title={['Authors', 'View']}>
      {status === 'loading' ? (
        <FullLoader />
      ) : status === 'success' ? (
        <div>
          {data ? (
            <Link href={`/authors/${data.id}/edit`}>edit</Link>
          ) : (
            'unknown author'
          )}
        </div>
      ) : (
        <span>{error?.message || 'unknown error ocurred'}</span>
      )}
    </PageLayout>
  )
}

export default ViewAuthor
