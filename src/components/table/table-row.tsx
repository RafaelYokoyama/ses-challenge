'use client'

import * as React from 'react'
import { TableRowProps } from './table.types'
import { cn } from '@/lib/utils'

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, onDoubleClick, hoverable = true, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          'border-b relative transition-colors duration-300',
          hoverable && 'hover:bg-gray-50 group cursor-pointer',
          className,
        )}
        onDoubleClick={onDoubleClick}
        data-slot="table-row"
        {...props}
      />
    )
  },
)

TableRow.displayName = 'TableRow'
