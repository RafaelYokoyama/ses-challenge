import { generateBreadcrumbs, formatLabel } from '@/lib/breadcrumb-utils'

describe('formatLabel', () => {
  it.each([
    ['new', 'Registro'],
    ['user', 'Usuários'],
    ['users', 'Usuários'],
    ['edit', 'Editar'],
    ['profile', 'Perfil'],
    ['NEW', 'Registro'],  
  ])('should format "%s" as "%s"', (input, expected) => {
    expect(formatLabel(input)).toBe(expected)
  })
})

describe('generateBreadcrumbs', () => {
  it('should generate breadcrumbs for simple path', () => {
    const result = generateBreadcrumbs('/users/edit')
    expect(result).toEqual([
      {
        href: '/users',
        label: 'Usuários',
        isActive: false,
      },
      {
        href: '/users/edit',
        label: 'Editar',
        isActive: true,
      },
    ])
  })

  it('should decode URL segments and format correctly', () => {
    const result = generateBreadcrumbs('/users/john-doe/profile')
    expect(result).toEqual([
      {
        href: '/users',
        label: 'Usuários',
        isActive: false,
      },
      {
        href: '/users/john-doe',
        label: 'john doe',
        isActive: false,
      },
      {
        href: '/users/john-doe/profile',
        label: 'Perfil',
        isActive: true,
      },
    ])
  })

  it('should handle root path', () => {
    const result = generateBreadcrumbs('/')
    expect(result).toEqual([])
  })

  it('should handle path with trailing slash', () => {
    const result = generateBreadcrumbs('/users/')
    expect(result).toEqual([
      {
        href: '/users',
        label: 'Usuários',
        isActive: true,
      },
    ])
  })

  it('should not mark any breadcrumb active if empty path', () => {
    const result = generateBreadcrumbs('')
    expect(result).toEqual([])
  })
})
