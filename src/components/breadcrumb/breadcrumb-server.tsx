import type { BreadcrumbItem } from '../../lib/breadcrumb-utils'
import type { BreadcrumbProps } from './breadcrumb.types'
import {
  BreadcrumbItem as Item,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbListItem,
} from './components'

interface BreadcrumbServerProps extends Omit<BreadcrumbProps, 'children'> {
  items: BreadcrumbItem[]
}

export default function BreadcrumbServer({
  items,
  separator,
  className = '',
}: BreadcrumbServerProps) {
  return (
    <nav
      className={`text-sm text-gray-600 my-4 ${className}`}
      aria-label="Breadcrumb"
      data-testid="breadcrumb"
    >
      <BreadcrumbList>
        {items.map((crumb, i) => (
          <BreadcrumbListItem key={i} index={i}>
            <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>
            <Item
              href={crumb.isActive ? undefined : crumb.href}
              isActive={crumb.isActive}
            >
              {crumb.label}
            </Item>
          </BreadcrumbListItem>
        ))}
      </BreadcrumbList>
    </nav>
  )
}
