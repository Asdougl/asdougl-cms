import classNames from 'classnames'
import type { ReactNode, TextareaHTMLAttributes } from 'react'
import { forwardRef, useId } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  isRequired?: boolean
  error?: string
  subtext?: ReactNode
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { label, className, error, isRequired, subtext, ...props },
    ref
  ) {
    const id = useId()
    return (
      <div className="flex flex-col py-4">
        <label htmlFor={id} className="px-2 pb-2 text-sm tracking-wider">
          {label} {isRequired && <span className="text-red-600">*</span>}
        </label>
        <textarea
          {...props}
          ref={ref}
          id={id}
          rows={32}
          className={classNames(
            'rounded-lg border-2 bg-transparent px-4 py-2 shadow-sm ring-primary-400/20 hover:ring focus:outline-none focus:ring disabled:bg-standard-100 disabled:hover:ring-0 dark:disabled:bg-standard-700',
            error
              ? 'border-red-200'
              : 'border-standard-200 focus:border-primary-400 dark:border-standard-600',
            className
          )}
        />
        {subtext && (
          <span className="px-4 pt-1 text-xs tracking-wide text-opacity-50">
            {subtext}
          </span>
        )}
        {error && <span className="pt-2 text-sm text-red-600">{error}</span>}
      </div>
    )
  }
)
