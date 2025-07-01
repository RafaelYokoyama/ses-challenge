export * from './table.types'

import { TableRoot } from './table-root'
import { TableHeader } from './table-header'
import { TableBody } from './table-body'
import { TableRow } from './table-row'
import { TableCell } from './table-cell'
import { TableHeadCell } from './table-head-cell'
import { TableAction } from './table-action'
import { TableEmptyState } from './table-empty-state'

export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeadCell: TableHeadCell,
  Action: TableAction,
  EmptyState: TableEmptyState,
}

export {
  TableRoot,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeadCell,
  TableAction,
  TableEmptyState,
} 