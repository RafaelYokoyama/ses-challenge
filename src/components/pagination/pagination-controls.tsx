import { PaginationControlsProps } from './pagination.types'
import { cn } from '@/lib/utils'

export const PaginationControls = ({
  children,
  className,
}: PaginationControlsProps) => {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {children}
    </div>
  )
}
