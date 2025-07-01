'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { AlertDialogFooterProps } from './alert-dialog.types'

export const AlertDialogFooter = ({
  className,
  ...props
}: AlertDialogFooterProps) => {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    />
  )
}
