import type { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {
  children: ReactNode
  className?: string
} & ComponentProps<'button'>

export const Button = ({ children, className, ...buttonProps }: Props) => {
  return (
    <button
      {...buttonProps}
      className={twMerge(
        'flex items-center justify-center gap-2 rounded-md px-3 py-2 bg-primary text-white  focus:ring-4 focus:ring-red-300 focus:outline-none hover:bg-red-800',
        className,
      )}
    >
      {children}
    </button>
  )
}
