import { ReactNode } from 'react'

export interface NotFoundRootProps {
  children: ReactNode
  className?: string
}

export interface NotFoundContentProps {
  children: ReactNode
  className?: string
}

export interface NotFoundIconProps {
  children: ReactNode
  className?: string
}

export interface NotFoundTitleProps {
  children: ReactNode
  className?: string
}

export interface NotFoundDescriptionProps {
  children: ReactNode
  className?: string
}

export interface NotFoundActionsProps {
  children: ReactNode
  className?: string
}

export interface NotFoundActionProps {
  href: string
  icon?: React.ElementType
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
} 