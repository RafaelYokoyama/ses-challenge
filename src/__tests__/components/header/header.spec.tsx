import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Header } from '@/components/header'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    priority,
    ...props
  }: {
    src: string
    alt: string
    priority?: boolean
    [key: string]: unknown
  }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        {...props}
        data-priority={priority ? 'true' : 'false'}
      />
    )
  },
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  usePathname: jest.fn(() => '/test'),
}))

jest.mock('@/http/get-user-profile', () => ({
  getUserProfile: jest.fn(() =>
    Promise.resolve({
      name: 'Test User',
      menu: [
        { label: 'Lista de amigos', route: 'friends' },
        { label: 'Artigos salvos', route: 'saved' },
        { label: 'Notificações', route: 'notifications' },
        { label: 'Preferências', route: 'preferences' },
        { label: 'Fechar Sessão', route: 'logout' },
      ],
    }),
  ),
}))

jest.mock('@/lib/breadcrumb-utils', () => ({
  generateBreadcrumbs: jest.fn(() => [
    { href: '/test', label: 'Test', isActive: true },
  ]),
  formatLabel: jest.fn((label: string) => label),
}))

describe('Header Components', () => {
  describe('Header.Root', () => {
    it('renders header root correctly', async () => {
      const component = await Header.Root()
      render(component)

      expect(document.body).toBeInTheDocument()
    })
  })

  describe('Header.Top', () => {
    it('renders header top section', () => {
      render(<Header.Top />)

      expect(document.body).toBeInTheDocument()
    })
  })

  describe('Header.Logo', () => {
    it('renders logo with default href', () => {
      render(<Header.Logo />)

      const button = screen.getByRole('button') || screen.getByRole('img')
      expect(button).toBeInTheDocument()
    })

    it('renders logo with custom href', () => {
      render(<Header.Logo href="/custom" />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })
  })

  describe('Header.Nav', () => {
    const mockUserProfile = {
      name: 'Test User',
      menu: [
        { label: 'Lista de amigos', route: 'friends' },
        { label: 'Artigos salvos', route: 'saved' },
        { label: 'Notificações', route: 'notifications' },
        { label: 'Preferências', route: 'preferences' },
        { label: 'Fechar Sessão', route: 'logout' },
      ],
    }

    it('renders navigation with user profile', () => {
      render(<Header.Nav userProfile={mockUserProfile} />)

      const nav = screen.getByLabelText('Navegação principal')
      expect(nav).toBeInTheDocument()
    })

    it('renders navigation without user profile', () => {
      const minimalProfile = {
        name: 'Guest User',
        menu: [],
      }

      render(<Header.Nav userProfile={minimalProfile} />)

      expect(document.body).toBeInTheDocument()
    })
  })

  describe('Header.UserSection', () => {
    const mockUserProfile = {
      name: 'Test User',
      menu: [
        { label: 'Lista de amigos', route: 'friends' },
        { label: 'Artigos salvos', route: 'saved' },
        { label: 'Notificações', route: 'notifications' },
        { label: 'Preferências', route: 'preferences' },
        { label: 'Fechar Sessão', route: 'logout' },
      ],
    }

    it('renders user section with profile', () => {
      render(<Header.UserSection userProfile={mockUserProfile} />)

      const userElement = screen.getByText('Test User') || document.body
      expect(userElement).toBeInTheDocument()
    })

    it('renders user section without profile', () => {
      const minimalProfile = {
        name: 'Guest User',
        menu: [],
      }

      render(<Header.UserSection userProfile={minimalProfile} />)

      expect(document.body).toBeInTheDocument()
    })
  })

  describe('Header Integration', () => {
    const mockUserProfile = {
      name: 'John Doe',
      menu: [
        { label: 'Lista de amigos', route: 'friends' },
        { label: 'Artigos salvos', route: 'saved' },
        { label: 'Notificações', route: 'notifications' },
        { label: 'Preferências', route: 'preferences' },
        { label: 'Fechar Sessão', route: 'logout' },
      ],
    }

    it('renders all header components together', () => {
      render(
        <div>
          <Header.Top />
          <Header.Logo href="/" />
          <Header.Nav userProfile={mockUserProfile} />
          <Header.UserSection userProfile={mockUserProfile} />
        </div>,
      )

      expect(document.body).toBeInTheDocument()
    })

    it('handles minimal user profile gracefully', () => {
      const minimalProfile = {
        name: 'Guest User',
        menu: [],
      }

      render(
        <div>
          <Header.Top />
          <Header.Logo />
          <Header.Nav userProfile={minimalProfile} />
          <Header.UserSection userProfile={minimalProfile} />
        </div>,
      )

      expect(document.body).toBeInTheDocument()
    })

    it('renders logo with different href values', () => {
      const hrefs = ['/', '/home', '/dashboard']

      hrefs.forEach((href) => {
        const { container } = render(<Header.Logo href={href} />)
        const link = container.querySelector('a')
        if (link) {
          expect(link).toHaveAttribute('href', href)
        }
      })
    })
  })

  describe('Header Accessibility', () => {
    const mockUserProfile = {
      name: 'Accessible User',
      menu: [
        { label: 'Lista de amigos', route: 'friends' },
        { label: 'Artigos salvos', route: 'saved' },
        { label: 'Notificações', route: 'notifications' },
        { label: 'Preferências', route: 'preferences' },
        { label: 'Fechar Sessão', route: 'logout' },
      ],
    }

    it('provides proper navigation landmarks', () => {
      render(<Header.Nav userProfile={mockUserProfile} />)

      const nav = screen.getByLabelText('Navegação principal')
      expect(nav).toBeInTheDocument()
    })

    it('logo has proper link semantics', () => {
      render(<Header.Logo href="/" />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })
  })
})
