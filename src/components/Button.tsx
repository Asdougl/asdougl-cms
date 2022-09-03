import classNames from 'classnames'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { forwardRef } from 'react'
import type { ActionType } from '../utils/colors'
import { getActionStyle } from '../utils/colors'

interface BaseButtonProps {
  category?: ActionType
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & BaseButtonProps

const ButtonBaseStyles =
  'border-2 rounded-lg px-6 py-2 shadow-sm ring-violet-400/20 hover:bg-opacity-50 focus:outline-none focus:ring'

export const Button = ({
  className,
  category = 'tertiary',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(
        'rounded-lg border-2 px-6 py-2 shadow-sm ring-violet-400/20 focus:outline-none focus:ring',
        getActionStyle(category),
        className
      )}
    />
  )
}

type AnchorButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  BaseButtonProps

export const AnchorButton = forwardRef<HTMLAnchorElement, AnchorButtonProps>(
  function AnchorButton({
    className,
    category = 'tertiary',
    ...props
  }: AnchorButtonProps) {
    return (
      <a
        {...props}
        className={classNames(
          'inline-block cursor-pointer text-center',
          ButtonBaseStyles,
          getActionStyle(category),
          className
        )}
      />
    )
  }
)
