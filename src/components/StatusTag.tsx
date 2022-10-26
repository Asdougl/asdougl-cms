import type { IconDefinition } from '@fortawesome/pro-regular-svg-icons'
import {
  faBoxArchive,
  faGlobe,
  faMagnifyingGlass,
  faPencil,
} from '@fortawesome/pro-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PostStatus } from '@prisma/client'
import classNames from 'classnames'
import { STATUS_LABELS } from '../utils/constants'

interface StatusTagProps {
  status: PostStatus
}

const COLORS: Record<PostStatus, string> = {
  [PostStatus.DRAFT]: 'bg-red-400/20 text-red-200',
  [PostStatus.REVIEW]: 'bg-orange-400/20 text-orange-500',
  [PostStatus.PUBLISHED]: 'bg-green-400/20 text-green-400',
  [PostStatus.ARCHIVED]: 'bg-slate-400/20 text-slate-800 dark:text-slate-200',
}

const ICON: Record<PostStatus, IconDefinition> = {
  [PostStatus.DRAFT]: faPencil,
  [PostStatus.REVIEW]: faMagnifyingGlass,
  [PostStatus.PUBLISHED]: faGlobe,
  [PostStatus.ARCHIVED]: faBoxArchive,
}

export const StatusTag = ({ status }: StatusTagProps) => {
  return (
    <div
      className={classNames(
        'flex items-center gap-1 rounded-2xl px-2 py-1 font-display text-xs font-bold uppercase tracking-wider',
        COLORS[status]
      )}
    >
      <FontAwesomeIcon icon={ICON[status]} fixedWidth size="sm" />
      <span>{STATUS_LABELS[status]}</span>
    </div>
  )
}
