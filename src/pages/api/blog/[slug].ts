import isArray from 'lodash/isArray'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db/client'

const queryParamString = (
  queryParam: string | string[] | undefined
): string => {
  return (isArray(queryParam) ? queryParam[0] : queryParam) || ''
}

const oneBlogPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = queryParamString(req.query.slug)
  const posts = await prisma.post.findUnique({
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
    where: { slug },
  })
  return res.status(200).json(posts)
}

export default oneBlogPost
