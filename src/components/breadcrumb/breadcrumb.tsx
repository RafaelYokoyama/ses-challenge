'use client'

import { usePathname } from 'next/navigation'
import { generateBreadcrumbs } from '../../lib/breadcrumb-utils'
import type { BreadcrumbProps } from './breadcrumb.types'
import {
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbListItem,
} from './components'

/**
 * Client Component para breadcrumbs dinâmicos
 * Use quando você precisa de breadcrumbs baseados na URL atual
 * Para breadcrumbs estáticos, prefira BreadcrumbServer
 */
const Breadcrumb = ({
  children,
  separator,
  className = '',
}: BreadcrumbProps) => {
  const pathname = usePathname()
  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    <nav
      className={`text-sm text-gray-600 my-4 ${className}`}
      aria-label="Breadcrumb"
      data-testid="breadcrumb"
    >
      <BreadcrumbList>
        {children ||
          breadcrumbs.map((crumb, i) => (
            <BreadcrumbListItem key={i} index={i}>
              {i > 0 && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
              <BreadcrumbItem
                href={crumb.isActive ? undefined : crumb.href}
                isActive={crumb.isActive}
              >
                {crumb.label}
              </BreadcrumbItem>
            </BreadcrumbListItem>
          ))}
      </BreadcrumbList>
    </nav>
  )
}

Breadcrumb.Item = BreadcrumbItem
Breadcrumb.Separator = BreadcrumbSeparator
Breadcrumb.List = BreadcrumbList
Breadcrumb.ListItem = BreadcrumbListItem

export default Breadcrumb
