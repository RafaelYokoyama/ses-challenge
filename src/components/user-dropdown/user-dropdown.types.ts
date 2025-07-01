import { ReactNode } from 'react'

export interface UserDropdownOption {
  label: string
  route: string
}

export interface UserDropdownProps {
  children: (context: UserDropdownContext) => ReactNode
}

export interface UserDropdownContext {
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

export interface UserDropdownTriggerProps {
  children: ReactNode
  onClick?: () => void
}

export interface UserDropdownContentProps {
  children: ReactNode
  options: UserDropdownOption[]
}

export interface UserDropdownItemProps {
  label: string
  route: string
  onClick?: () => void
}

export interface UserDropdownLegacyProps {
  children: ReactNode
  options: UserDropdownOption[]
} 