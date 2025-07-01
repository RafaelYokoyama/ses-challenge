'use client'

import * as React from 'react'
import { TableCellProps } from './table.types'
import { cn } from '@/lib/utils'

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn('h-18 pr-4', className)}
        data-slot="table-cell"
        {...props}
      />
    )
  },
)

TableCell.displayName = 'TableCell'
