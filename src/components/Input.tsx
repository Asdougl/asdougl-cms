import classNames from 'classnames'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { forwardRef, useId } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  isRequired?: boolean
  error?: string
  subtext?: ReactNode
  containerClassName?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    className,
    error,
    subtext,
    isRequired,
    containerClassName,
    ...props
  },
  ref
) {
  const id = useId()
  return (
    <div className={`flex flex-col py-4 ${containerClassName}`}>
      <label htmlFor={id} className="px-2 pb-2 text-sm tracking-wider">
        {label} {isRequired && <span className="text-error-600">*</span>}
      </label>
      <input
        // eslint-disable-next-line
        {...props}
        ref={ref}
        id={id}
        className={classNames(
          'rounded-lg border-2 bg-transparent px-4 py-2 shadow-sm ring-primary-400/20 hover:ring focus:outline-none focus:ring disabled:bg-standard-100 disabled:hover:ring-0 dark:disabled:bg-standard-700',
          error
            ? 'border-red-200'
            : 'border-standard-200 focus:border-primary-400 dark:border-standard-600',
          className
        )}
      />
      {subtext && (
        <span className="px-4 pt-1 text-xs tracking-wide text-black/50">
          {subtext}
        </span>
      )}
      {error && <span className="pt-2 text-sm text-error-600">{error}</span>}
    </div>
  )
})
