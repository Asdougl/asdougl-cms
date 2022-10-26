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
  'rounded-2xl px-6 py-2 uppercase tracking-wide font-display hover:bg-opacity-60 w-full lg:w-auto'

export const Button = ({
  className,
  category = 'tertiary',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={classNames(
        ButtonBaseStyles,
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
