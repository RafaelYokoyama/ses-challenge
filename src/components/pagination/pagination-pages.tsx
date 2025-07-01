'use client'

import { usePaginationContext } from './pagination-context'
import { PaginationPagesProps } from './pagination.types'
import { PaginationButton } from './pagination-button'
import { PaginationEllipsis } from './pagination-ellipsis'
import { PaginationPageButton } from './pagination-page-button'
import { cn } from '@/lib/utils'

export const PaginationPages = ({
  maxVisible: customMaxVisible,
  className,
}: PaginationPagesProps = {}) => {
  const { currentPage, totalPages, onPageChange, maxVisiblePages } =
    usePaginationContext()

  const maxVisible = customMaxVisible ?? maxVisiblePages ?? 3

  const showFirstPage = currentPage > 2

  const showLastPage = totalPages > 1 && currentPage < totalPages - 1

  const getVisiblePages = () => {
    const pages = []

    if (currentPage === 1) {
      for (let i = 1; i <= Math.min(maxVisible, totalPages); i++) {
        pages.push(i)
      }
    } else if (currentPage === totalPages) {
      for (
        let i = Math.max(1, totalPages - maxVisible + 1);
        i <= totalPages;
        i++
      ) {
        pages.push(i)
      }
    } else {
      const start = currentPage - 1
      const end = currentPage + 1
      for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
        pages.push(i)
      }
    }

    return pages
  }

  const visiblePages = getVisiblePages()

  return (
    <>
      {showFirstPage && (
        <PaginationButton
          onClick={() => onPageChange(1)}
          variant="first"
          data-testid="first-page-button"
          className={currentPage <= 2 ? 'hidden' : ''}
        >
          1
        </PaginationButton>
      )}

      {currentPage > 2 && <PaginationEllipsis />}

      <div
        className={cn(
          'flex divide-x border lg:text-sm text-xs border-[#9E9E9E] rounded-full overflow-hidden',
          className,
        )}
      >
        {visiblePages.map((page) => (
          <PaginationPageButton
            key={page}
            page={page}
            isActive={page === currentPage}
            onClick={onPageChange}
            data-testid={`page-button-${page}`}
          />
        ))}
      </div>

      {currentPage < totalPages - 1 && <PaginationEllipsis />}

      {showLastPage && (
        <PaginationButton
          onClick={() => onPageChange(totalPages)}
          variant="last"
          data-testid="last-page-button"
          className={currentPage >= 6 ? 'hidden' : ''}
        >
          {totalPages}
        </PaginationButton>
      )}
    </>
  )
}
