import { z } from 'zod'
import aws from 'aws-sdk'
import { v4 as uuid } from 'uuid'
import { env } from '../../env/server.mjs'
import { createProtectedRouter } from './protected-router'

aws.config.update({
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
  region: 'ap-southeast-2',
})

const fileType = z.enum(['jpg', 'jpeg', 'png', 'gif'])

export const filesRouter = createProtectedRouter()
  .query('getImages', {
    input: z.object({
      postId: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.image.findMany({
        where: { postId: input.postId },
      })
    },
  })
  .mutation('createPostImgUploadUrl', {
    input: z.object({
      postId: z.string(),
      alttext: z.string(),
      filetype: fileType,
    }),
    async resolve({ ctx, input }) {
      const s3 = new aws.S3()

      const filename = `${input.postId}-${uuid()}.${input.filetype}`

      const image = await ctx.prisma.image.create({
        data: {
          filename,
          alttext: input.alttext,
          postId: input.postId,
        },
      })

      const presignedUrl = s3.getSignedUrl('putObject', {
        Bucket: 'asdougl-uploads',
        Key: filename,
        Expires: 10,
      })

      return {
        image,
        url: presignedUrl,
      }
    },
  })
  .mutation('createAuthorImgUploadUrl', {
    input: z.object({
      authorId: z.string(),
      filetype: fileType,
    }),
    async resolve({ ctx, input }) {
      const s3 = new aws.S3()

      const filename = `${input.authorId}-${uuid()}.${input.filetype}`

      const image = await ctx.prisma.author.update({
        where: { id: input.authorId },
        data: {
          image: filename,
        },
      })

      const presignedUrl = s3.getSignedUrl('putObject', {
        Bucket: 'asdougl-uploads',
        Key: filename,
        Expires: 600,
      })

      return {
        image,
        url: presignedUrl,
      }
    },
  })
  .mutation('confirmPostImg', {
    input: z.object({
      fileid: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.image.update({
        where: {
          id: input.fileid,
        },
        data: {
          verified: true,
        },
      })
    },
  })
