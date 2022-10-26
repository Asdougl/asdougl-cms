import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCircle } from '@fortawesome/pro-regular-svg-icons'
import { RadioGroup } from '@headlessui/react'
import type { PostStatus } from '@prisma/client'
import classNames from 'classnames'
import { STATUS_LABELS, STATUS_VALUES } from '../../../utils/constants'

interface StatusPickerProps {
  status: PostStatus
  onChange?: (status: PostStatus) => void
  disabled?: boolean
}

export const StatusPicker = ({
  status,
  onChange,
  disabled,
}: StatusPickerProps) => {
  return (
    <RadioGroup
      value={status}
      onChange={onChange}
      className="flex flex-col rounded-2xl bg-slate-800 p-2 md:flex-row"
    >
      {STATUS_VALUES.map((status) => (
        <RadioGroup.Option
          key={status}
          value={status}
          disabled={disabled}
          className={({ checked }) =>
            classNames(
              'rounded-2xl px-4 py-2 ring-primary-200/20 transition-colors focus:ring',
              {
                'bg-primary-400 text-slate-800 shadow-lg': checked,
                'cursor-pointer': !disabled,
                'opacity-60': !checked && disabled,
              }
            )
          }
        >
          {({ checked }) => (
            <span className="flex items-center gap-2">
              <FontAwesomeIcon icon={checked ? faCheckCircle : faCircle} />
              {STATUS_LABELS[status]}
            </span>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  )
}
