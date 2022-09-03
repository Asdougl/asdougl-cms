import type { Author } from '@prisma/client'
import Link from 'next/link'

interface AuthorCardProps {
  author: Author
}

export const AuthorCard = ({ author }: AuthorCardProps) => {
  return (
    <Link href={`/authors/${author.id}`}>
      <a className="flex items-center gap-3 rounded-lg border-2 border-slate-900 px-4 py-2 dark:border-slate-600">
        <div className="text-xl">{author.name}</div>
        <div className="opacity-70">@{author.username}</div>
      </a>
    </Link>
  )
}
