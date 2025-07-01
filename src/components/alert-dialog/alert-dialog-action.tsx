'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { AlertDialogActionProps } from './alert-dialog.types'

export const AlertDialogAction = ({
  className,
  ...props
}: AlertDialogActionProps) => {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}
