import { Dialog } from '@headlessui/react'
import { Loader } from '../../../components/Loader'
import { getImgUrl } from '../../../utils/img'
import { trpc } from '../../../utils/trpc'

interface ImagesModalProps {
  postId: string
  open: boolean
  onClose: () => void
}

export const ImagesModal = ({ open, onClose, postId }: ImagesModalProps) => {
  const { data } = trpc.useQuery(['files.getImages', { postId }])
  const { mutateAsync: createUrlMutate } = trpc.useMutation([
    'files.createPostImgUploadUrl',
  ])
  const { mutateAsync: confirmUrlMutate } = trpc.useMutation([
    'files.confirmPostImg',
  ])

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/25"></div>
      <div className="fixed inset-0 flex overflow-y-auto">
        <div className="flex min-h-full w-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="w-full max-w-screen-xl transform overflow-hidden rounded-2xl bg-standard-900 py-6 px-8 text-left align-middle text-white shadow-xl transition-all">
            <Dialog.Title className="font-display text-2xl font-bold">
              Select Image
            </Dialog.Title>
            {data ? (
              <>
                <ul className="grid grid-cols-4 pt-6">
                  {data.map((img) => (
                    <li
                      key={img.id}
                      className="rounded-lg border border-standard-600 p-2"
                    >
                      <img src={getImgUrl(img.filename)} className="max-h-64" />
                      <span className="rounded px-2 text-sm opacity-70">
                        {img.alttext}
                      </span>
                    </li>
                  ))}
                </ul>
                <input type="file" className="w-full" />
              </>
            ) : (
              <Loader />
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  )
}
