import { clientEnv } from '../env/schema.mjs'

export const getImgUrl = (filename: string | undefined | null) =>
  `${clientEnv.NEXT_PUBLIC_S3_PATH}${filename}`
