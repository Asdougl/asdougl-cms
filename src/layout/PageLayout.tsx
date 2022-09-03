import type { IconDefinition } from '@fortawesome/pro-regular-svg-icons'
import {
  faUserCircle,
  faCog,
  faHouse,
  faNewspaper,
} from '@fortawesome/pro-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import isArray from 'lodash/isArray'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import type { FC, ReactNode } from 'react'
import { Fragment } from 'react'
import { Logo } from '../components/Logo'
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
}> = ({ to, icon, label, exact }) => {
  return (
    <NavLink
      to={to}
      exact={exact}
      className={(active) =>
        classNames(
          {
            'text-violet-400 before:absolute before:top-full before:left-1/2 before:h-1 before:w-1 before:-translate-x-1/2 before:rounded-full before:bg-violet-400 md:border-violet-400 md:before:hidden':
              active,
          },
          'relative flex flex-col items-center justify-center gap-8 border-transparent px-8 py-4 md:flex-row md:justify-start md:border-l-4'
        )
      }
    >
      <FontAwesomeIcon icon={icon} />{' '}
      <span className="hidden md:inline">{label}</span>
    </NavLink>
  )
}

export const PageLayout = ({
  children,
  className,
  title,
  noContainer,
  unauthenticated,
  actions,
}: PageLayoutProps) => {
  const { data } = useSession({ required: !unauthenticated })

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
      <div className="grid h-screen grid-rows-[60px_1fr] bg-slate-50 dark:bg-slate-900 dark:text-white md:grid-cols-[200px_1fr] md:grid-rows-1 lg:grid-cols-[300px_1fr]">
        <div className="flex h-full grid-cols-2 border-r border-r-slate-200 dark:border-r-slate-700 md:flex-col">
          <div className="flex flex-grow items-center px-8 py-2 text-slate-800 dark:text-slate-50 md:flex-grow-0 md:py-8">
            <Link href="/">
              <a>
                <Logo className="h-10 md:h-14" />
              </a>
            </Link>
          </div>
          <nav className="fixed bottom-0 left-0 flex w-full flex-grow justify-evenly bg-gradient-to-t from-slate-50 to-transparent py-4 font-display text-lg dark:from-slate-900 md:static md:flex-col md:justify-start md:gap-8">
            <NavbarLink exact to="/" icon={faHouse} label="Home" />
            <NavbarLink to="/posts" icon={faNewspaper} label="Blogpost" />
            <NavbarLink to="/authors" icon={faUserCircle} label="Authors" />
            <NavbarLink to="/settings" icon={faCog} label="Settings" />
          </nav>
          {data && (
            <Link href="/settings/profile">
              <a className="group flex flex-row-reverse items-center gap-2 py-2 px-8 font-display md:flex-col md:py-8">
                {data.user?.image && (
                  <div className="rounded-full border border-slate-400 p-[.15rem] group-hover:bg-violet-400/20 dark:border-slate-600 md:p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={data.user.image}
                      alt=""
                      className="h-8 w-8 rounded-full md:h-10 md:w-10"
                    />
                  </div>
                )}
                <div className="hidden group-hover:text-violet-400 group-hover:underline md:block">
                  {data.user?.name}
                </div>
              </a>
            </Link>
          )}
        </div>
        <div
          className={classNames(
            'grid-cols-10 overflow-y-auto pb-20',
            { 'px-4': !noContainer },
            className
          )}
        >
          <div className="flex flex-wrap items-start justify-between px-2 pb-2 md:px-8 md:pb-6 md:pt-12">
            {title && (
              <h1 className="tracking-widermd:text-4xl flex flex-wrap items-center gap-2 font-display text-3xl">
                {isArray(title) ? (
                  title.map((ele, index) => (
                    <Fragment key={ele}>
                      {index > 0 && <span className="opacity-40">/</span>}
                      <span className="font-semibold">{ele}</span>
                    </Fragment>
                  ))
                ) : (
                  <span className="font-semibold">{title}</span>
                )}
              </h1>
            )}
            {actions}
          </div>
          <div className="md:px-8">{children}</div>
        </div>
      </div>
    </>
  )
}
