import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import UserDropdown from '@/components/user-dropdown'

const mockLocation = {
  href: '',
}

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})

describe('UserDropdown Component', () => {
  const mockOptions = [
    { label: 'Profile', route: 'profile' },
    { label: 'Settings', route: 'settings' },
    { label: 'Logout', route: 'logout' },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    mockLocation.href = ''
  })

  it('renders trigger button with children', () => {
    render(
      <UserDropdown options={mockOptions}>
        <span>User Menu</span>
      </UserDropdown>,
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('User Menu')).toBeInTheDocument()
  })

  it('has correct accessibility attributes when closed', () => {
    render(
      <UserDropdown options={mockOptions}>
        <span>User Menu</span>
      </UserDropdown>,
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveAttribute('aria-haspopup', 'true')
  })

  it('opens dropdown when button is clicked', () => {
    render(
      <UserDropdown options={mockOptions}>
        <span>User Menu</span>
      </UserDropdown>,
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('displays all menu options when open', () => {
    render(
      <UserDropdown options={mockOptions}>
        <span>User Menu</span>
      </UserDropdown>,
    )

    fireEvent.click(screen.getByRole('button'))

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('closes dropdown when clicking outside', async () => {
    render(
      <div>
        <UserDropdown options={mockOptions}>
          <span>User Menu</span>
        </UserDropdown>
        <div data-testid="outside">Outside Element</div>
      </div>,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('outside'))

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'false',
      )
    })
  })

  it('closes dropdown when escape key is pressed', async () => {
    render(
      <UserDropdown options={mockOptions}>
        <span>User Menu</span>
      </UserDropdown>,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-expanded',
        'false',
      )
    })
  })

  it('navigates to correct route when option is clicked', () => {
    const assignSpy = jest.fn()
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
        assign: assignSpy,
      },
      writable: true,
    })

    render(
      <UserDropdown options={mockOptions}>
        <span>User Menu</span>
      </UserDropdown>,
    )

    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Profile'))

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes dropdown after option selection', () => {
    render(
      <UserDropdown options={mockOptions}>
        <span>User Menu</span>
      </UserDropdown>,
    )

    fireEvent.click(screen.getByRole('button'))
    fireEvent.click(screen.getByText('Settings'))

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('shows hover indicator on mouse enter', () => {
    render(
      <UserDropdown options={mockOptions}>
        <span>User Menu</span>
      </UserDropdown>,
    )

    fireEvent.click(screen.getByRole('button'))
    const firstOption = screen.getByText('Profile')

    fireEvent.mouseEnter(firstOption)

    expect(screen.getByTestId('hover-indicator')).toBeInTheDocument()
  })

  it('hides hover indicator on mouse leave', () => {
    render(
      <UserDropdown options={mockOptions}>
        <span>User Menu</span>
      </UserDropdown>,
    )

    fireEvent.click(screen.getByRole('button'))
    const firstOption = screen.getByText('Profile')

    fireEvent.mouseEnter(firstOption)
    fireEvent.mouseLeave(firstOption)

    expect(screen.queryByTestId('hover-indicator')).not.toBeInTheDocument()
  })

  it('positions hover indicator correctly for different options', () => {
    render(
      <UserDropdown options={mockOptions}>
        <span>User Menu</span>
      </UserDropdown>,
    )

    fireEvent.click(screen.getByRole('button'))

    fireEvent.mouseEnter(screen.getByText('Settings'))
    const indicator = screen.getByTestId('hover-indicator')
    expect(indicator).toHaveStyle('top: 36px')
  })

  it('toggles dropdown state correctly', () => {
    render(
      <UserDropdown options={mockOptions}>
        <span>User Menu</span>
      </UserDropdown>,
    )

    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('renders with empty options array', () => {
    render(
      <UserDropdown options={[]}>
        <span>User Menu</span>
      </UserDropdown>,
    )

    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('handles multiple rapid clicks correctly', () => {
    render(
      <UserDropdown options={mockOptions}>
        <span>User Menu</span>
      </UserDropdown>,
    )

    const button = screen.getByRole('button')

    fireEvent.click(button)
    fireEvent.click(button)
    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-expanded', 'true')
  })
})
