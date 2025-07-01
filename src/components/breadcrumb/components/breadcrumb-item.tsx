import SmartNavigation from '@/components/smart-navigation'
import type { BreadcrumbItemProps } from '../breadcrumb.types'

export default function BreadcrumbItem({
  href,
  children,
  isActive = false,
  className = '',
}: BreadcrumbItemProps) {
  const baseClasses =
    'capitalize text-xs lg:text-sm truncate max-w-[100px] lg:max-w-none'
  const activeClasses = 'font-semibold text-gray-900'
  const linkClasses =
    'hover:underline text-[#7E50CE] bg-transparent border-none p-0'

  if (isActive || !href) {
    return (
      <span
        className={`${baseClasses} ${activeClasses} ${className}`}
        title={children?.toString()}
        data-testid="breadcrumb-item-active"
      >
        {children}
      </span>
    )
  }

  return (
    <SmartNavigation
      href={href}
      preventRSC={false}
      className={`${baseClasses} ${linkClasses} ${className}`}
      title={children?.toString()}
      data-testid="breadcrumb-item-link"
    >
      {children}
    </SmartNavigation>
  )
}
