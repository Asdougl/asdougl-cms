import { zodResolver } from '@hookform/resolvers/zod'
import type { Author } from '@prisma/client'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AnchorButton, Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Toggle } from '../../components/Toggle'

const AuthorData = z.object({
  username: z
    .string()
    .min(1)
    .regex(/^([a-z0-9-_]*)$/),
  name: z.string().min(1).max(100),
  bio: z.string().min(1).max(255),
  image: z.string().min(1).nullish(),
  twitter: z.string().nullish(),
  github: z.string().nullish(),
  website: z.string().nullish(),
  public: z.boolean(),
})
type AuthorData = z.infer<typeof AuthorData>

interface AuthorEditorProps {
  author?: Author
  onSuccess: (data: AuthorData) => void
  loading?: boolean
}

export const AuthorEditor = ({
  author,
  onSuccess,
  loading,
}: AuthorEditorProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorData>({
    resolver: zodResolver(AuthorData),
    defaultValues: author,
  })

  const onSubmit = handleSubmit(onSuccess)

  return (
    <form onSubmit={onSubmit}>
      <div className="grid grid-cols-3 gap-4">
        <Input
          disabled={loading}
          label="Username"
          isRequired
          error={errors.username?.message}
          containerClassName="col-span-3"
          {...register('username')}
        />
        <Input
          disabled={loading}
          label="Name"
          isRequired
          error={errors.name?.message}
          containerClassName="col-span-3"
          {...register('name')}
        />
        <Input
          disabled={loading}
          label="Bio"
          isRequired
          error={errors.bio?.message}
          containerClassName="col-span-3"
          {...register('bio')}
        />
        <Input
          disabled={loading}
          label="Image Url"
          isRequired
          error={errors.bio?.message}
          containerClassName="col-span-3"
          {...register('image')}
        />
        <Input
          disabled={loading}
          label="Twitter"
          isRequired
          error={errors.twitter?.message}
          {...register('twitter')}
        />
        <Input
          disabled={loading}
          label="Github"
          isRequired
          error={errors.github?.message}
          {...register('github')}
        />
        <Input
          disabled={loading}
          label="Website"
          isRequired
          error={errors.website?.message}
          {...register('website')}
        />
        <Toggle
          containerClassName="col-span-3"
          disabled={loading}
          label="Public"
          {...register('public')}
        />
      </div>
      <div className="flex gap-4 pt-4">
        <Button category="primary" type="submit">
          {author ? 'Save' : 'Create'}
        </Button>
        <Link href="/authors">
          <AnchorButton type="button">Back</AnchorButton>
        </Link>
      </div>
    </form>
  )
}
