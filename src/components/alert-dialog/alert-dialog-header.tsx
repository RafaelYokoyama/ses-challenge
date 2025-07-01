'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { AlertDialogHeaderProps } from './alert-dialog.types'

export const AlertDialogHeader = ({
  className,
  ...props
}: AlertDialogHeaderProps) => {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}
