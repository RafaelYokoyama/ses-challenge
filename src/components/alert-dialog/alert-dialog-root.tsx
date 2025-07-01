'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { AlertDialogProps } from './alert-dialog.types'

export const AlertDialogRoot = ({ ...props }: AlertDialogProps) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}
