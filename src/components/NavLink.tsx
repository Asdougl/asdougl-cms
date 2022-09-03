import isFunction from 'lodash/isFunction'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'

interface NavLinkProps {
  to: string
  className?: string | ((active: boolean) => string)
  children?: ((active: boolean) => ReactNode) | ReactNode
  exact?: boolean
}

export const NavLink = ({ to, className, exact, children }: NavLinkProps) => {
  const router = useRouter()

  const isActive = exact ? router.asPath === to : router.asPath.includes(to)

  return (
    <Link href={to}>
      <a className={isFunction(className) ? className(isActive) : className}>
        {isFunction(children) ? children(isActive) : children}
      </a>
    </Link>
  )
}
