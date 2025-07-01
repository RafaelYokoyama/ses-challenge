'use client'

import { PaginationButtonProps } from './pagination.types'
import { cn } from '@/lib/utils'

const variantStyles = {
  previous:
    'hidden lg:block px-4 h-8 py-1 border border-[#9E9E9E] cursor-pointer rounded-full disabled:opacity-50',
  next: 'hidden lg:block px-4 py-1 h-8 border border-[#9E9E9E] cursor-pointer rounded-full disabled:opacity-50',
  first:
    'lg:w-8 w-5 lg:h-8 h-5 rounded-full border border-[#9E9E9E] cursor-pointer text-center',
  last: 'lg:w-8 w-5 lg:h-8 h-5 rounded-full border text-xs lg:text-sm border-[#9E9E9E] cursor-pointer text-center',
}

export const PaginationButton = ({
  onClick,
  disabled = false,
  variant = 'previous',
  children,
  className,
  'data-testid': dataTestId,
}: PaginationButtonProps) => {
  const baseStyles = variantStyles[variant]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseStyles, className)}
      data-testid={dataTestId}
    >
      {children}
    </button>
  )
}
