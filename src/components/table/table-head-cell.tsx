'use client'

import * as React from 'react'
import { TableHeadCellProps } from './table.types'
import { cn } from '@/lib/utils'

export const TableHeadCell = React.forwardRef<
  HTMLTableCellElement,
  TableHeadCellProps
>(({ className, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={cn('py-2 pr-4', className)}
      data-slot="table-head-cell"
      {...props}
    />
  )
})

TableHeadCell.displayName = 'TableHeadCell'
