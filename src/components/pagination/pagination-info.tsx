import { usePaginationContext } from './pagination-context'
import { PaginationInfoProps } from './pagination.types'
import { cn } from '@/lib/utils'

export const PaginationInfo = ({
  totalItems: customTotalItems,
  className,
}: Partial<PaginationInfoProps> = {}) => {
  const { totalItems } = usePaginationContext()
  const displayTotalItems = customTotalItems ?? totalItems

  return (
    <span className={cn('lg:text-base text-xs', className)}>
      Total {displayTotalItems}
    </span>
  )
}
