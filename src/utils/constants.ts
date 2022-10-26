import { PostStatus } from '@prisma/client'

export const DATE_TIME_FORMAT = 'h:mma, D MMM YYYY'
export const DATE_FORMAT = 'DD/MM/YYYY'
export const TIME_FORMAT = 'h:mma'

export const STATUS_VALUES = Object.values(PostStatus)
export const STATUS_LABELS: Record<PostStatus, string> = {
  [PostStatus.DRAFT]: 'Draft',
  [PostStatus.REVIEW]: 'Review',
  [PostStatus.PUBLISHED]: 'Published',
  [PostStatus.ARCHIVED]: 'Archived',
}
