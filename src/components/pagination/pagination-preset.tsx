'use client'

import { PaginationProps } from './pagination.types'
import { Pagination } from './index'

interface PaginationPresetProps extends PaginationProps {
  showPreviousNext?: boolean
}

export const PaginationPreset = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  showInfo = true,
  showPageSelect = true,
  showPreviousNext = true,
  maxVisiblePages = 3,
  className,
}: PaginationPresetProps) => {
  return (
    <Pagination.Root
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
      onPageChange={onPageChange}
      showInfo={showInfo}
      showPageSelect={showPageSelect}
      maxVisiblePages={maxVisiblePages}
      className={className}
    >
      {showInfo && <Pagination.Info />}

      <Pagination.Controls>
        {showPreviousNext && (
          <Pagination.Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="previous"
            data-testid="prev-button"
          >
            Anterior
          </Pagination.Button>
        )}

        <Pagination.Pages />

        {showPreviousNext && (
          <Pagination.Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="next"
            data-testid="next-button"
          >
            Próximo
          </Pagination.Button>
        )}
      </Pagination.Controls>

      {showPageSelect && <Pagination.PageSelect />}
    </Pagination.Root>
  )
}
