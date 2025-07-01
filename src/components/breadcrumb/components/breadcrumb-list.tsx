import type { ReactNode } from 'react'

interface BreadcrumbListProps {
  children: ReactNode
  className?: string
}

interface BreadcrumbListItemProps {
  children: ReactNode
  className?: string
  index?: number
}

export function BreadcrumbList({
  children,
  className = '',
}: BreadcrumbListProps) {
  return (
    <ol
      className={`flex flex-wrap items-center gap-1 max-w-full overflow-hidden ${className}`}
      data-testid="breadcrumb-list"
    >
      {children}
    </ol>
  )
}

export function BreadcrumbListItem({
  children,
  className = '',
  index,
}: BreadcrumbListItemProps) {
  return (
    <li
      className={`flex items-center gap-1 min-w-0 ${className}`}
      data-testid={
        index !== undefined ? `breadcrumb-item-${index}` : 'breadcrumb-item'
      }
    >
      {children}
    </li>
  )
}
