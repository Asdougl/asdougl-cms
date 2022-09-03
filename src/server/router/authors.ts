import { z } from 'zod'
import { createProtectedRouter } from './protected-router'

export const authorsRouter = createProtectedRouter()
  .query('getAuthors', {
    async resolve({ ctx }) {
      return await ctx.prisma.author.findMany()
    },
  })
  .query('getAuthorWithPosts', {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.author.findUnique({
        where: { id: input },
        include: { posts: true },
      })
    },
  })
  .query('getAuthorUsernames', {
    async resolve({ ctx }) {
      const authors = await ctx.prisma.author.findMany({
        select: {
          username: true,
        },
      })
      return authors.map((author) => author.username)
    },
  })
  .mutation('createAuthor', {
    input: z.object({
      username: z
        .string()
        .min(1)
        .regex(/^([a-z0-9-_]*)$/),
      name: z.string(),
      bio: z.string(),
      image: z.string().nullish(),
      twitter: z.string().nullish(),
      github: z.string().nullish(),
      website: z.string().nullish(),
      public: z.boolean(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.author.create({
        data: input,
      })
    },
  })
  .mutation('updateAuthor', {
    input: z.object({
      id: z.string(),
      username: z
        .string()
        .min(1)
        .regex(/^([a-z0-9-_]*)$/)
        .optional(),
      name: z.string().optional(),
      bio: z.string().optional(),
      image: z.string().nullish().optional(),
      twitter: z.string().nullish().optional(),
      github: z.string().nullish().optional(),
      website: z.string().nullish().optional(),
      public: z.boolean().optional(),
    }),
    async resolve({ ctx, input: { id, ...author } }) {
      return await ctx.prisma.author.update({
        where: {
          id: id,
        },
        data: author,
      })
    },
  })
