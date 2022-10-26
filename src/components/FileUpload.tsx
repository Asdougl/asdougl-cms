import { useId, useState } from 'react'

interface FileUploadProps {
  onUpload: (params: { file: File; alt: string }) => void
}

export const FileUpload = ({ onUpload }: FileUploadProps) => {
  const [activeFile, setActiveFile] = useState<File | null>(null)
  const [alttext, setAlttext] = useState('')
  const id = useId()
  return (
    <label htmlFor={id}>
      <input type="file" id={id} className="w-full" />
    </label>
  )
}
