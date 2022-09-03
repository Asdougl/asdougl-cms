import { createProtectedRouter } from './protected-router'

export const usersRouter = createProtectedRouter().query('getAllUsers', {
  async resolve({ ctx }) {
    return ctx.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
      },
    })
  },
})
