import type { EditorRef } from '@milkdown/react/lib/types'
import { Editor as MDEditor, rootCtx, defaultValueCtx } from '@milkdown/core'
import { ReactEditor, useEditor } from '@milkdown/react'
import { commonmark } from '@milkdown/preset-commonmark'
import { history } from '@milkdown/plugin-history'
import { forwardRef } from 'react'
import type { FC, TextareaHTMLAttributes } from 'react'

interface EditorProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

export const Editor: FC<EditorProps> = forwardRef<
  HTMLTextAreaElement,
  EditorProps
>(function Editor({ label, ...props }, ref) {
  return (
    <>
      <label htmlFor="">{label}</label>
      <textarea
        ref={ref}
        {...props}
        style={{ height: ref?.current }}
      ></textarea>
    </>
  )
})
