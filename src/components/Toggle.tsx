import classNames from 'classnames'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { useState, forwardRef, useId } from 'react'

interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  isRequired?: boolean
  error?: string
  subtext?: ReactNode
  containerClassName?: string
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
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
  const [checked, setChecked] = useState(props.value === 'true')
  const id = useId()
  console.log(checked, props.value)
  return (
    <div className={classNames('flex flex-row py-4', containerClassName)}>
      <div className="flex items-center">
        <label
          htmlFor={id}
          className={`relative h-6 w-12 cursor-pointer rounded-full bg-standard-100 shadow-sm transition-colors ${
            checked ? 'bg-primary-300' : 'bg-standard-100 dark:bg-slate-800'
          }`}
        >
          <input
            {...props}
            type="checkbox"
            ref={ref}
            id={id}
            className={classNames(
              'absolute top-0 left-0 z-10 h-full w-full cursor-pointer appearance-none rounded-full ring-primary-400/20 hover:ring focus:outline-none focus:ring disabled:hover:ring-0',
              className
            )}
            onChange={(e) => {
              setChecked(e.target.checked)
              props.onChange?.(e)
            }}
          />
          <div className="h-full p-1">
            <div className="relative h-full">
              <div
                className={classNames(
                  'absolute top-0 left-0 h-4 w-4 rounded-full shadow-md transition-all',
                  checked ? 'translate-x-6 bg-standard-50' : 'bg-standard-300',
                  { 'opacity-40': props.disabled }
                )}
              ></div>
            </div>
          </div>
        </label>
        {label && (
          <label htmlFor={id} className="pl-4 text-sm tracking-wider">
            {label} {isRequired && <span className="text-error-500">*</span>}
          </label>
        )}
      </div>
      {subtext && (
        <span className="px-4 pt-1 text-xs tracking-wide text-opacity-50">
          {subtext}
        </span>
      )}
      {error && <span className="pt-2 text-sm text-error-500">{error}</span>}
    </div>
  )
})
