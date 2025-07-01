'use client'

import * as React from 'react'
import { TableBodyProps } from './table.types'
import { cn } from '@/lib/utils'

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={cn('', className)}
      data-slot="table-body"
      {...props}
    />
  )
})

TableBody.displayName = 'TableBody'
