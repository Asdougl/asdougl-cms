import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import isArray from 'lodash/isArray'
import { PageLayout } from '../../../layout/PageLayout'
import { trpc } from '../../../utils/trpc'
import { Loader } from '../../../components/Loader'
import { AuthorEditor } from '../../../features/authorEditor/AuthorEditor'

const EditAuthor: NextPage = () => {
  const utils = trpc.useContext()
  const {
    query: { authorid },
    push,
  } = useRouter()
  const parsedAuthorId = (isArray(authorid) ? authorid[0] : authorid) || ''
  const { data, status, error } = trpc.useQuery([
    'author.getAuthorWithPosts',
    parsedAuthorId,
  ])
  const { mutate, isLoading } = trpc.useMutation(['author.updateAuthor'], {
    onSuccess: (data) => {
      utils.invalidateQueries(['author.getAuthorWithPosts', data.id])
      utils.invalidateQueries(['author.getAuthorUsernames'])
      utils.invalidateQueries(['author.getAuthors'])
      push(`/posts/${data.id}`)
    },
  })

  return (
    <PageLayout
      title={data ? ['Authors', data.username, 'Edit'] : ['Authors', 'Edit']}
    >
      {status === 'loading' ? (
        <Loader />
      ) : status === 'success' ? (
        <div>
          {data ? (
            <AuthorEditor
              author={data}
              onSuccess={(edited) => mutate({ ...edited, id: parsedAuthorId })}
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

export default EditAuthor
