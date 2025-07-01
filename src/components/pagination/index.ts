export * from './pagination.types'

import { PaginationRoot } from './pagination-root'
import { PaginationInfo } from './pagination-info'
import { PaginationControls } from './pagination-controls'
import { PaginationButton } from './pagination-button'
import { PaginationPages } from './pagination-pages'
import { PaginationPageButton } from './pagination-page-button'
import { PaginationEllipsis } from './pagination-ellipsis'
import { PaginationPageSelect } from './pagination-page-select'

export const Pagination = {
  Root: PaginationRoot,
  Info: PaginationInfo,
  Controls: PaginationControls,
  Button: PaginationButton,
  Pages: PaginationPages,
  PageButton: PaginationPageButton,
  Ellipsis: PaginationEllipsis,
  PageSelect: PaginationPageSelect,
}

export {
  PaginationRoot,
  PaginationInfo,
  PaginationControls,
  PaginationButton,
  PaginationPages,
  PaginationPageButton,
  PaginationEllipsis,
  PaginationPageSelect,
} 