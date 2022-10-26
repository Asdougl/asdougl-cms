import {
  faQuestionCircle,
  faUser,
  faUserSecret,
} from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { Author } from '@prisma/client'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { getImgUrl } from '../../utils/img'

interface AuthorCardProps {
  author: Author
}

export const AuthorCard = ({ author }: AuthorCardProps) => {
  return (
    <Link href={`/authors/${author.id}`}>
      <a className="flex w-full items-center gap-4 rounded-2xl px-6 py-4 hover:bg-accent">
        <div>
          {author.image ? (
            <Image
              src={getImgUrl(author.image)}
              alt=""
              width="56"
              height="56"
              className="rounded-full"
            />
          ) : (
            <FontAwesomeIcon icon={faQuestionCircle} className="h-14 w-14" />
          )}
        </div>
        <div className="flex flex-grow flex-col">
          <div className="font-display text-2xl">{author.name}</div>
          <div className="flex opacity-40">
            @{author.username} &bull; github.com/{author.github} &bull;{' '}
            {author.website}
          </div>
        </div>
        <div
          className={classNames(
            'flex items-center gap-1 rounded-2xl px-2 py-1 font-display text-xs font-bold uppercase tracking-wider',
            author.public
              ? 'bg-green-400/20 text-green-400'
              : 'bg-red-400/20 text-red-200'
          )}
        >
          <FontAwesomeIcon
            icon={author.public ? faUser : faUserSecret}
            fixedWidth
            size="sm"
          />
          <span>{author.public ? 'Public' : 'Hidden'}</span>
        </div>
      </a>
    </Link>
  )
}
