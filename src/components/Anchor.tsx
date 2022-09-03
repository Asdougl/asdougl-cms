import { faExternalLink } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import type { AnchorHTMLAttributes } from 'react'

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean
}

export const Anchor = ({
  className,
  children,
  external,
  ...props
}: AnchorProps) => {
  return (
    <a
      {...props}
      className={classNames('group relative text-violet-400', className)}
    >
      {children}
      {external && (
        <FontAwesomeIcon icon={faExternalLink} className="pl-1" size="xs" />
      )}
      <span className="absolute left-0 bottom-0 hidden w-full border-b border-b-violet-400 group-hover:inline"></span>
    </a>
  )
}
