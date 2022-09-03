import { Dialog, Transition } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { trpc } from '../../utils/trpc'
import { Button } from '../Button'
import { Input } from '../Input'
import { MiniLoader } from '../Loader'

interface NewPostModalProps {
  open: boolean
  onClose: () => void
}

const MinimalPost = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
})
type MinimalPost = z.infer<typeof MinimalPost>

export const NewPostModal = ({ open, onClose }: NewPostModalProps) => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MinimalPost>({
    resolver: zodResolver(MinimalPost),
  })

  const { mutate, isLoading } = trpc.useMutation(['post.createPost'], {
    onSuccess: (data) => {
      router.push(`/posts/${data.id}/edit`)
    },
  })

  const onSubmit = handleSubmit(console.log)

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog open={open} onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25"></div>
        </Transition.Child>
        <div className="fixed inset-0 flex overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-standard-900 py-6 px-8 text-left align-middle text-white shadow-xl transition-all">
                <Dialog.Title className="font-display text-2xl font-bold">
                  Create a Post
                </Dialog.Title>
                <form onSubmit={onSubmit}>
                  <Input
                    label="Title"
                    {...register('title')}
                    error={errors.title?.message}
                  />
                  <Input
                    label="URL Slug"
                    {...register('slug')}
                    error={errors.title?.message}
                  />
                  <div className="flex gap-4 pt-4">
                    <Button
                      category="primary"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? <MiniLoader /> : 'Create'}
                    </Button>
                    <Button
                      type="button"
                      onClick={onClose}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
