import { PaginationEllipsisProps } from './pagination.types'
import { cn } from '@/lib/utils'

export const PaginationEllipsis = ({
  className,
}: PaginationEllipsisProps = {}) => {
  return <span className={cn('w-4 text-center', className)}>...</span>
}
