'use client'

import { PaginationContext } from './pagination-context'
import { PaginationProps } from './pagination.types'
import { cn } from '@/lib/utils'

interface PaginationRootProps extends PaginationProps {
  children: React.ReactNode
}

export const PaginationRoot = ({
  children,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  showInfo = true,
  showPageSelect = true,
  maxVisiblePages = 3,
  className,
}: PaginationRootProps) => {
  const contextValue = {
    currentPage,
    totalPages,
    totalItems,
    onPageChange,
    showInfo,
    showPageSelect,
    maxVisiblePages,
    className,
  }

  return (
    <PaginationContext.Provider value={contextValue}>
      <div
        className={cn(
          'flex items-center justify-between mt-4 text-sm text-gray-600 space-x-2',
          className,
        )}
      >
        {children}
      </div>
    </PaginationContext.Provider>
  )
}
