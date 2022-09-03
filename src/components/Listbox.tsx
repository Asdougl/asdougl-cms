import { faChevronDown } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import isString from 'lodash/isString'
import type { ReactNode, SelectHTMLAttributes } from 'react'
import { useId, forwardRef } from 'react'

type OptionObject = { text: string; value: string }
export type ListboxOption = string | OptionObject

const parseOption = (option: ListboxOption): OptionObject => {
  return !isString(option) ? option : { text: option, value: option }
}

export interface ListboxProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: ListboxOption[]
  label: string
  isRequired?: boolean
  error?: string
  subtext?: ReactNode
}

export const Listbox = forwardRef<HTMLSelectElement, ListboxProps>(
  function Listbox(
    { className, options, label, isRequired, error, subtext, ...props },
    ref
  ) {
    const id = useId()

    return (
      <div className="flex flex-col py-4">
        <label htmlFor={id} className="px-2 pb-2 text-sm tracking-wider">
          {label} {isRequired && <span className="text-error-500">*</span>}
        </label>
        <div
          className={classNames(
            'group relative block rounded-lg border-2 shadow-sm ring-primary-400/20 focus-within:ring hover:ring disabled:hover:ring-0',
            props.disabled
              ? 'bg-standard-100 dark:bg-standard-700'
              : 'bg-transparent',
            error
              ? 'border-error-200'
              : 'border-standard-200 focus-within:border-primary-400 dark:border-standard-600'
          )}
        >
          <select
            ref={ref}
            {...props}
            id={id}
            className={classNames(
              'w-full appearance-none bg-transparent px-4 py-2 focus:outline-none',
              className
            )}
          >
            <option
              value=""
              disabled
              className="bg-standard-50 dark:bg-standard-900"
            >
              Select One
            </option>
            {options.map((option) => {
              const parsed = parseOption(option)
              return (
                <option
                  key={parsed.value}
                  value={parsed.value}
                  className="bg-standard-50 dark:bg-standard-900"
                >
                  {parsed.text}
                </option>
              )
            })}
          </select>
          <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 px-4 text-primary-400">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
        {subtext && (
          <span className="px-4 pt-1 text-xs tracking-wide text-black/50">
            {subtext}
          </span>
        )}
        {error && <span className="pt-2 text-sm text-error-500">{error}</span>}
      </div>
    )
  }
)
