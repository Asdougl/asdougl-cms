import { PostStatus } from '@prisma/client'
import isArray from 'lodash/isArray'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db/client'

const PAGE_SIZE = 10

const queryParamString = (
  queryParam: string | string[] | undefined
): string => {
  return (isArray(queryParam) ? queryParam[0] : queryParam) || ''
}

const blog = async (req: NextApiRequest, res: NextApiResponse) => {
  const pageNum = parseInt(queryParamString(req.query.page))
  const page = isNaN(pageNum) ? 0 : pageNum
  const search = queryParamString(req.query.search)
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      summary: true,
      updatedAt: true,
      publishedAt: true,
      author: {
        select: {
          username: true,
          name: true,
          image: true,
          twitter: true,
          github: true,
        },
      },
    },
    where: {
      status: PostStatus.PUBLISHED,
      title: search ? { contains: search } : undefined,
      author: { public: true },
    },
    orderBy: {
      updatedAt: 'desc',
    },
    skip: page ? page * PAGE_SIZE : undefined,
    take: PAGE_SIZE,
  })
  return res.status(200).json(posts)
}

export default blog
