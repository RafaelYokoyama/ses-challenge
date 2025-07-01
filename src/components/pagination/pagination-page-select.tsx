'use client'

import { usePaginationContext } from './pagination-context'
import { PaginationPageSelectProps } from './pagination.types'
import { cn } from '@/lib/utils'

export const PaginationPageSelect = ({
  className,
}: PaginationPageSelectProps = {}) => {
  const { currentPage, totalPages, onPageChange } = usePaginationContext()

  if (totalPages <= 1) return null

  return (
    <div className={cn('flex items-center lg:space-x-1', className)}>
      <span className="lg:text-base text-xs">Ir para a página</span>
      <select
        className="border-b border-[#9E9E9E] cursor-pointer lg:px-2 py-1 lg:text-sm text-xs"
        value={currentPage}
        onChange={(e) => onPageChange(Number(e.target.value))}
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <option key={page} value={page}>
            {page}
          </option>
        ))}
      </select>
    </div>
  )
}
