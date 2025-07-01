import * as React from 'react'

export type TableProps = React.ComponentProps<'table'>

export type TableHeaderProps = React.ComponentProps<'thead'>

export type TableBodyProps = React.ComponentProps<'tbody'>

export interface TableRowProps 
  extends React.ComponentProps<'tr'> {
  onDoubleClick?: () => void
  hoverable?: boolean
}

export type TableCellProps = React.ComponentProps<'td'>

export type TableHeadCellProps = React.ComponentProps<'th'>

export interface TableActionProps 
  extends React.ComponentProps<'td'> {
  children: React.ReactNode
  showOnHover?: boolean
}

export interface TableEmptyStateProps {
  colSpan: number
  icon?: string
  title?: string
  description?: string
} 