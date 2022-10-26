import type { IconDefinition } from '@fortawesome/pro-regular-svg-icons'
import {
  faUserCircle,
  faCog,
  faNewspaper,
} from '@fortawesome/pro-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import isArray from 'lodash/isArray'
import Head from 'next/head'
import type { FC, ReactNode } from 'react'
import { NavLink } from '../components/NavLink'

interface PageLayoutProps {
  children: ReactNode
  title?: string | string[]
  className?: string
  noContainer?: boolean
  unauthenticated?: boolean
  actions?: ReactNode
}

const NavbarLink: FC<{
  icon: IconDefinition
  label: string
  to: string
  exact?: boolean
}> = ({ to, icon, exact }) => {
  return (
    <div className="flex items-center justify-center py-4">
      <NavLink
        to={to}
        exact={exact}
        className={(active) =>
          classNames(
            {
              'bg-accent text-primary-400 hover:text-primary-300': active,
            },
            'relative flex flex-col items-center justify-center gap-2 rounded-2xl border-transparent px-6 py-4 font-display tracking-wide hover:bg-accent'
          )
        }
      >
        <FontAwesomeIcon icon={icon} size="xl" fixedWidth />
      </NavLink>
    </div>
  )
}

export const PageLayout = ({ children, className, title }: PageLayoutProps) => {
  const headTitle = title
    ? `${isArray(title) ? title[title.length - 1] : title} | Asdougl CMS`
    : 'Asdougl CMS'

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content="Asdougl CMS" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="min-h-screen bg-background text-white">
        <div className="container mx-auto grid grid-rows-[1fr_100px] gap-8 px-4 py-12">
          <main className={classNames('pb-20', className)}>{children}</main>
          <nav className="fixed bottom-0 left-0 w-screen bg-background/20 backdrop-blur-xl">
            <div className="container mx-auto grid grid-cols-3 px-4">
              <NavbarLink to="/posts" icon={faNewspaper} label="Posts" />
              <NavbarLink to="/authors" icon={faUserCircle} label="Authors" />
              <NavbarLink to="/settings" icon={faCog} label="Settings" />
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}
