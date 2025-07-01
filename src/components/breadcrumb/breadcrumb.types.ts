import { ReactNode } from 'react'

export interface BreadcrumbProps {
  children?: ReactNode
  separator?: ReactNode
  className?: string
}

export interface BreadcrumbItemProps {
  href?: string
  children: ReactNode
  isActive?: boolean
  className?: string
}

export interface BreadcrumbSeparatorProps {
  children?: ReactNode
  className?: string
} 