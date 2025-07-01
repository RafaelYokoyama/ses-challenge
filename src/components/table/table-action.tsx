'use client'

import * as React from 'react'
import { TableActionProps } from './table.types'
import { cn } from '@/lib/utils'

export const TableAction = React.forwardRef<
  HTMLTableCellElement,
  TableActionProps
>(({ className, children, showOnHover = true, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={cn(
        'h-18 text-center lg:absolute lg:right-0 lg:top-1 lg:pr-4',
        className,
      )}
      data-slot="table-action"
      {...props}
    >
      <div
        className={cn(
          'flex items-center justify-center w-full h-full',
          showOnHover && 'lg:hidden lg:group-hover:flex',
        )}
      >
        {children}
      </div>
    </td>
  )
})

TableAction.displayName = 'TableAction'
