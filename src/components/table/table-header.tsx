'use client'

import * as React from 'react'
import { TableHeaderProps } from './table.types'
import { cn } from '@/lib/utils'

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      className={cn(
        'uppercase text-gray-500 font-semibold text-xs border-b',
        className,
      )}
      data-slot="table-header"
      {...props}
    />
  )
})

TableHeader.displayName = 'TableHeader'
