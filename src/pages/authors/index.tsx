import { faUserCircle } from '@fortawesome/pro-regular-svg-icons'
import type { NextPage } from 'next'
import { useState } from 'react'
import { AuthorCard } from '../../components/cards/AuthorCard'
import { FullLoader } from '../../components/Loader'
import { PageSearch } from '../../components/PageSearch'
import { PageLayout } from '../../layout/PageLayout'
import { trpc } from '../../utils/trpc'

const Authors: NextPage = () => {
  const [search, setSearch] = useState<string>()
  const { data, status, error } = trpc.useQuery([
    'author.getAuthors',
    { search },
  ])

  return (
    <PageLayout title="Authors">
      <PageSearch
        onSearch={setSearch}
        createRoute="/authors/create"
        ctxIcon={faUserCircle}
      />
      {status === 'loading' ? (
        <FullLoader />
      ) : status === 'success' ? (
        <div className="flex flex-col items-start gap-6 pt-4">
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
