import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Breadcrumb from '@/components/breadcrumb'

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
}

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/user/john'),
  useRouter: jest.fn(() => mockRouter),
}))

jest.mock('react-icons/fa', () => ({
  FaCaretRight: () => <span data-testid="caret-icon">▶</span>,
}))

jest.mock('@/lib/breadcrumb-utils', () => ({
  generateBreadcrumbs: jest.fn(() => [
    { label: 'Home', href: '/', isActive: false },
    { label: 'User', href: '/user', isActive: false },
    { label: 'John', href: '/user/john', isActive: true },
  ]),
}))

describe('Breadcrumb Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockRouter.push.mockClear()
    mockRouter.replace.mockClear()
  })

  describe('Default Breadcrumb', () => {
    it('renders breadcrumb navigation correctly', () => {
      render(<Breadcrumb />)

      expect(screen.getByRole('navigation')).toBeInTheDocument()
      expect(screen.getByLabelText('Breadcrumb')).toBeInTheDocument()
      expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
    })

    it('renders generated breadcrumb items', () => {
      render(<Breadcrumb />)

      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('User')).toBeInTheDocument()
      expect(screen.getByText('John')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      render(<Breadcrumb className="custom-breadcrumb" />)

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveClass('custom-breadcrumb')
    })

    it('renders custom separator', () => {
      render(<Breadcrumb separator=">" />)

      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('renders separators only between items', () => {
      render(<Breadcrumb />)

      const separators = screen.getAllByTestId('caret-icon')
      expect(separators).toHaveLength(2)
    })
  })

  describe('Breadcrumb with Custom Children', () => {
    it('renders custom children instead of generated breadcrumbs', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.ListItem index={0}>
            <Breadcrumb.Item href="/">Custom Home</Breadcrumb.Item>
          </Breadcrumb.ListItem>
          <Breadcrumb.ListItem index={1}>
            <Breadcrumb.Separator>/</Breadcrumb.Separator>
            <Breadcrumb.Item isActive>Custom Current</Breadcrumb.Item>
          </Breadcrumb.ListItem>
        </Breadcrumb>,
      )

      expect(screen.getByText('Custom Home')).toBeInTheDocument()
      expect(screen.getByText('Custom Current')).toBeInTheDocument()
    })
  })

  describe('Breadcrumb.Item', () => {
    it('renders item with href as link', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.ListItem index={0}>
            <Breadcrumb.Item href="/test">Test Link</Breadcrumb.Item>
          </Breadcrumb.ListItem>
        </Breadcrumb>,
      )

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveTextContent('Test Link')
    })

    it('renders active item without link', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.ListItem index={0}>
            <Breadcrumb.Item isActive>Active Item</Breadcrumb.Item>
          </Breadcrumb.ListItem>
        </Breadcrumb>,
      )

      expect(screen.getByText('Active Item')).toBeInTheDocument()
      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })
  })

  describe('Breadcrumb.Separator', () => {
    it('renders separator with default content', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.ListItem index={0}>
            <Breadcrumb.Separator />
          </Breadcrumb.ListItem>
        </Breadcrumb>,
      )

      expect(screen.getByTestId('caret-icon')).toBeInTheDocument()
    })

    it('renders separator with custom content', () => {
      render(
        <Breadcrumb>
          <Breadcrumb.ListItem index={0}>
            <Breadcrumb.Separator>→</Breadcrumb.Separator>
          </Breadcrumb.ListItem>
        </Breadcrumb>,
      )

      expect(screen.getByText('→')).toBeInTheDocument()
    })
  })

  describe('Breadcrumb.List', () => {
    it('renders list container', () => {
      render(
        <Breadcrumb.List>
          <div>List Content</div>
        </Breadcrumb.List>,
      )

      expect(screen.getByText('List Content')).toBeInTheDocument()
    })
  })

  describe('Breadcrumb.ListItem', () => {
    it('renders list item with index', () => {
      render(
        <Breadcrumb.ListItem index={0}>
          <span>Item Content</span>
        </Breadcrumb.ListItem>,
      )

      expect(screen.getByText('Item Content')).toBeInTheDocument()
    })

    it('handles first item styling', () => {
      render(
        <Breadcrumb.ListItem index={0}>
          <span>First Item</span>
        </Breadcrumb.ListItem>,
      )

      expect(screen.getByText('First Item')).toBeInTheDocument()
    })

    it('handles subsequent item styling', () => {
      render(
        <Breadcrumb.ListItem index={1}>
          <span>Second Item</span>
        </Breadcrumb.ListItem>,
      )

      expect(screen.getByText('Second Item')).toBeInTheDocument()
    })
  })

  describe('Breadcrumb Accessibility', () => {
    it('has proper aria attributes', () => {
      render(<Breadcrumb />)

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumb')
    })

    it('maintains semantic structure', () => {
      render(<Breadcrumb />)

      expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })
  })
})
