'use client'

import * as React from 'react'
import { ConfirmModal } from './confirm-modal'
import { DeleteModalProps } from './modal.types'

export const DeleteModal = ({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  isLoading = false,
  entityName = 'item',
}: DeleteModalProps) => {
  const defaultTitle = title || `Excluir ${entityName}?`
  const defaultDescription =
    description ||
    `Tem certeza que deseja excluir este ${entityName}? Esta ação não pode ser desfeita.`

  return (
    <ConfirmModal
      open={open}
      onOpenChange={onOpenChange}
      title={defaultTitle}
      description={defaultDescription}
      confirmText={isLoading ? '🔄 Excluindo...' : 'Excluir'}
      cancelText="Cancelar"
      onConfirm={onConfirm}
      isLoading={isLoading}
      variant="destructive"
    />
  )
}
