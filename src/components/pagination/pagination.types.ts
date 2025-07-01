export interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  onPageChange: (page: number) => void
  showInfo?: boolean
  showPageSelect?: boolean
  maxVisiblePages?: number
  className?: string
}

export type PaginationContextValue = PaginationProps

export interface PaginationInfoProps {
  totalItems: number
  className?: string
}

export interface PaginationControlsProps {
  children: React.ReactNode
  className?: string
}

export interface PaginationButtonProps {
  onClick: () => void
  disabled?: boolean
  variant?: 'previous' | 'next' | 'first' | 'last'
  children: React.ReactNode
  className?: string
  'data-testid'?: string
}

export interface PaginationPagesProps {
  maxVisible?: number
  className?: string
}

export interface PaginationPageButtonProps {
  page: number
  isActive?: boolean
  onClick: (page: number) => void
  className?: string
  'data-testid'?: string
}

export interface PaginationEllipsisProps {
  className?: string
}

export interface PaginationPageSelectProps {
  className?: string
} 