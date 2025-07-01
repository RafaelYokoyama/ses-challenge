'use client'

import * as React from 'react'
import { AlertDialog } from '@/components/alert-dialog'
import { ModalProps } from './modal.types'

export const Modal = ({ open, onOpenChange, children }: ModalProps) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Content>{children}</AlertDialog.Content>
    </AlertDialog.Root>
  )
}
