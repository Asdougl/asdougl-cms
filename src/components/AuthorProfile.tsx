import { faQuestion } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { Author } from '@prisma/client'
import { clientEnv } from '../env/schema.mjs'

interface AuthorProfileProps {
  author: Pick<Author, 'id' | 'name' | 'image'> | null | undefined
}

export const AuthorProfile = ({ author }: AuthorProfileProps) => {
  return (
    <>
      {author?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`${clientEnv.NEXT_PUBLIC_S3_PATH}${author.image}`}
          alt=""
          className="h-6 w-6 rounded-full"
        />
      ) : (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-standard-200 dark:bg-standard-600">
          <FontAwesomeIcon icon={faQuestion} />
        </div>
      )}
      {author?.name || 'Unknown'}
    </>
  )
}
