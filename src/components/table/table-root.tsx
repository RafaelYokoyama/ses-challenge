'use client'

import * as React from 'react'
import { TableProps } from './table.types'
import { cn } from '@/lib/utils'

export const TableRoot = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => {
    return (
      <table
        ref={ref}
        className={cn(
          'w-full text-sm text-left border-t border-b border-gray-200 overflow-hidden',
          className,
        )}
        data-slot="table"
        {...props}
      />
    )
  },
)

TableRoot.displayName = 'TableRoot'
