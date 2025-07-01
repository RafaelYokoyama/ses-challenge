'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { AlertDialogTriggerProps } from './alert-dialog.types'

export const AlertDialogTrigger = ({ ...props }: AlertDialogTriggerProps) => {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}
