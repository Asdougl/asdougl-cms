import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { AuthorEditor } from '../../features/authorEditor/AuthorEditor'
import { PageLayout } from '../../layout/PageLayout'
import { trpc } from '../../utils/trpc'

const CreateAuthor: NextPage = () => {
  const router = useRouter()
  const utils = trpc.useContext()
  const { mutate, isLoading } = trpc.useMutation(['author.createAuthor'], {
    onSuccess: (data) => {
      utils.invalidateQueries(['author.getAuthors'])
      utils.invalidateQueries(['author.getAuthorUsernames'])
      router.push(`/authors/${data.id}`)
    },
  })

  return (
    <PageLayout title={['Authors', 'Create Author']}>
      <AuthorEditor onSuccess={mutate} loading={isLoading} />
    </PageLayout>
  )
}

export default CreateAuthor
