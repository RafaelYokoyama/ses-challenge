export interface BreadcrumbItem {
  href: string
  label: string
  isActive: boolean
}

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  
  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    const label = decodeURIComponent(segment).replace(/-/g, ' ')
    return { 
      href, 
      label: formatLabel(label), 
      isActive: index === segments.length - 1 
    }
  })
}

export function formatLabel(label: string): string {
  const labelMap: Record<string, string> = {
    'new': 'Registro',
    'user': 'Usuários',
    'users': 'Usuários',
    'edit': 'Editar',
    'profile': 'Perfil',
    'id': 'Perfil'
  }
  
  return labelMap[label.toLowerCase()] || label
} 