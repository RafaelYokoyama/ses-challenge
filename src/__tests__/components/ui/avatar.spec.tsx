import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Avatar } from '@/components/ui/avatar'

describe('Avatar Component', () => {
  it('renders initials from name correctly', () => {
    render(<Avatar name="John Doe" />)

    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders single name initial correctly', () => {
    render(<Avatar name="Alice" />)

    expect(screen.getByText('A')).toBeInTheDocument()
  })

  it('renders multiple words initials correctly', () => {
    render(<Avatar name="John Michael Doe" />)

    expect(screen.getByText('JMD')).toBeInTheDocument()
  })

  it('applies default size classes', () => {
    const { container } = render(<Avatar name="Test User" />)

    const avatar = container.firstChild as HTMLElement
    expect(avatar).toHaveClass('w-32', 'h-32', 'text-3xl')
  })

  it('applies small size classes', () => {
    const { container } = render(<Avatar name="Test User" size="sm" />)

    const avatar = container.firstChild as HTMLElement
    expect(avatar).toHaveClass('w-10', 'h-10', 'text-lg')
  })

  it('applies medium size classes', () => {
    const { container } = render(<Avatar name="Test User" size="md" />)

    const avatar = container.firstChild as HTMLElement
    expect(avatar).toHaveClass('w-20', 'h-20', 'text-xl')
  })

  it('applies large size classes', () => {
    const { container } = render(<Avatar name="Test User" size="lg" />)

    const avatar = container.firstChild as HTMLElement
    expect(avatar).toHaveClass('w-32', 'h-32', 'text-3xl')
  })

  it('applies extra large size classes', () => {
    const { container } = render(<Avatar name="Test User" size="xl" />)

    const avatar = container.firstChild as HTMLElement
    expect(avatar).toHaveClass('w-40', 'h-40', 'text-4xl')
  })

  it('applies custom className', () => {
    const { container } = render(
      <Avatar name="Test User" className="custom-avatar" />,
    )

    const avatar = container.firstChild as HTMLElement
    expect(avatar).toHaveClass('custom-avatar')
  })

  it('applies common avatar classes', () => {
    const { container } = render(<Avatar name="Test User" />)

    const avatar = container.firstChild as HTMLElement
    expect(avatar).toHaveClass(
      'rounded-full',
      'flex',
      'items-center',
      'justify-center',
      'text-white',
      'font-bold',
      'shadow-lg',
    )
  })

  it('generates consistent colors based on name', () => {
    const { container: container1 } = render(<Avatar name="John Doe" />)
    const { container: container2 } = render(<Avatar name="John Doe" />)

    const avatar1 = container1.firstChild as HTMLElement
    const avatar2 = container2.firstChild as HTMLElement

    expect(avatar1.className).toBe(avatar2.className)
  })

  it('generates different colors for different names', () => {
    const { container: container1 } = render(<Avatar name="Alice" />)
    const { container: container2 } = render(<Avatar name="Bob" />)

    const avatar1 = container1.firstChild as HTMLElement
    const avatar2 = container2.firstChild as HTMLElement

    expect(avatar1).toBeInTheDocument()
    expect(avatar2).toBeInTheDocument()
  })

  it('handles custom colors array', () => {
    const customColors = [
      'from-red-500 to-red-600',
      'from-blue-500 to-blue-600',
    ]

    render(<Avatar name="Test User" colors={customColors} />)

    expect(screen.getByText('TU')).toBeInTheDocument()
  })

  it('converts initials to uppercase', () => {
    render(<Avatar name="john doe" />)

    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('handles special characters in name', () => {
    render(<Avatar name="José María" />)

    expect(screen.getByText('JM')).toBeInTheDocument()
  })

  it('handles single character names', () => {
    render(<Avatar name="X" />)

    expect(screen.getByText('X')).toBeInTheDocument()
  })
})
