'use client'

import { PaginationPageButtonProps } from './pagination.types'
import { cn } from '@/lib/utils'

export const PaginationPageButton = ({
  page,
  isActive = false,
  onClick,
  className,
  'data-testid': dataTestId,
}: PaginationPageButtonProps) => {
  return (
    <button
      onClick={() => onClick(page)}
      data-testid={dataTestId}
      className={cn(
        'lg:w-8 w-5 lg:h-8 h-5 text-xs lg:text-sm text-center cursor-pointer',
        isActive
          ? 'bg-[#9E9E9E] text-white font-bold'
          : 'bg-white text-gray-700',
        className,
      )}
    >
      {page}
    </button>
  )
}
