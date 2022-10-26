import type { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCirclePlus } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import type { ChangeEventHandler } from 'react'
import { useState } from 'react'
import { useThrottle } from '../hooks/useThrottle'

interface PageSearchProps {
  onSearch: (term: string) => void
  disabled?: boolean
  createRoute?: string
  ctxIcon?: IconProp
}

export const PageSearch = ({
  onSearch,
  disabled,
  createRoute,
  ctxIcon,
}: PageSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const throttledSearch = useThrottle(onSearch, 500)

  const searchHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value
    setSearchTerm(value)
    throttledSearch(value)
  }

  return (
    <div className="mb-8 flex divide-x divide-background overflow-hidden rounded-2xl bg-accent font-display text-lg focus-within:ring focus-within:ring-primary-400">
      {ctxIcon && (
        <div className="flex items-center justify-center px-6">
          <FontAwesomeIcon icon={ctxIcon} size="lg" />
        </div>
      )}
      <input
        type="text"
        placeholder="Search"
        className="w-full flex-grow bg-transparent px-6 py-4 font-display focus:bg-accent-hover focus:outline-none"
        value={searchTerm}
        onChange={searchHandler}
        disabled={disabled}
      />
      {createRoute && (
        <Link href={createRoute}>
          <a className="flex items-center justify-center px-8 hover:bg-accent-hover">
            <FontAwesomeIcon icon={faCirclePlus} />
          </a>
        </Link>
      )}
    </div>
  )
}
