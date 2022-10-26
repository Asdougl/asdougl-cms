// src/server/router/index.ts
import superjson from 'superjson'
import { authorsRouter } from './authors'
import { createRouter } from './context'
import { filesRouter } from './files'

import { postsRouter } from './posts'
import { usersRouter } from './users'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('post.', postsRouter)
  .merge('user.', usersRouter)
  .merge('author.', authorsRouter)
  .merge('files.', filesRouter)

// export type definition of API
export type AppRouter = typeof appRouter
