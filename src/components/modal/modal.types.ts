import * as React from 'react'

export interface ModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export interface ConfirmModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void | Promise<void>
  onCancel?: () => void
  isLoading?: boolean
  variant?: 'destructive' | 'default'
}

export interface DeleteModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  onConfirm: () => void | Promise<void>
  isLoading?: boolean
  entityName?: string
} 