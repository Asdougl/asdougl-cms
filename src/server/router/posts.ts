import type { Post } from '@prisma/client'
import { PostStatus } from '@prisma/client'
import { z } from 'zod'
import { createProtectedRouter } from './protected-router'

export const postsRouter = createProtectedRouter()
  .query('getAllPosts', {
    input: z
      .object({
        search: z.string().optional(),
        page: z.number().optional(),
      })
      .optional(),
    async resolve({ ctx, input }) {
      const PAGE_SIZE = 10
      return ctx.prisma.post.findMany({
        include: {
          author: { select: { id: true, name: true, image: true } },
        },
        where: input?.search
          ? {
              title: {
                contains: input.search,
              },
            }
          : undefined,
        orderBy: {
          updatedAt: 'desc',
        },
        skip: input?.page ? input.page * PAGE_SIZE : undefined,
        take: PAGE_SIZE,
      })
    },
  })
  .query('getOnePost', {
    input: z.string(),
    async resolve({ ctx, input }) {
      return ctx.prisma.post.findUnique({
        where: { id: input },
        include: {
          author: { select: { id: true, name: true, image: true } },
        },
      })
    },
  })
  .mutation('updateOnePost', {
    input: z.object({
      id: z.string(),
      title: z.string().optional(),
      slug: z.string().optional(),
      content: z.string().optional(),
      authorId: z.string().nullish(),
      status: z.nativeEnum(PostStatus).optional(),
    }),
    async resolve({ ctx, input: { id, ...post } }) {
      const data: Partial<Post> = {
        ...post,
      }

      if (post.status === 'PUBLISHED') {
        data.publishedAt = new Date()
      }

      return ctx.prisma.post.update({
        where: { id: id },
        data,
      })
    },
  })
  .mutation('createPost', {
    input: z.object({
      title: z.string(),
      slug: z.string(),
      content: z.string().optional(),
      summary: z.string(),
      authorId: z.string().nullish(),
      status: z.nativeEnum(PostStatus).optional(),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          slug: input.slug,
          content: input.content || '',
          summary: input.summary,
          author: input.authorId
            ? {
                connect: {
                  id: input.authorId,
                },
              }
            : undefined,
          status: input.status || 'DRAFT',
          publishedAt: input.status === 'PUBLISHED' ? new Date() : null,
        },
      })
    },
  })
