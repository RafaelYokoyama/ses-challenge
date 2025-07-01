import { ReactNode } from 'react'

export interface HeroSectionProps {
  children: ReactNode
  className?: string
}

export interface HeroItemProps {
  icon: ReactNode
  title: string
  subtitle: string
} 