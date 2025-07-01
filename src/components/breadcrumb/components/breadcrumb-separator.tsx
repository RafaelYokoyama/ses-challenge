import { FaCaretRight } from 'react-icons/fa'
import type { BreadcrumbSeparatorProps } from '../breadcrumb.types'

export default function BreadcrumbSeparator({
  children,
  className = '',
}: BreadcrumbSeparatorProps) {
  return (
    <span className={className} data-testid="breadcrumb-separator">
      {children || (
        <FaCaretRight className="size-2 lg:size-3 text-gray-300 mb-[2px] flex-shrink-0" />
      )}
    </span>
  )
}
