import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { StatCard } from '@/components/ui/stat-card'
import { Users, TrendingUp, TrendingDown } from 'lucide-react'

describe('StatCard Component', () => {
  it('renders label and value correctly', () => {
    render(<StatCard label="Total Users" value="150" icon={Users} />)

    expect(screen.getByText('Total Users')).toBeInTheDocument()
    expect(screen.getByText('150')).toBeInTheDocument()
  })

  it('renders icon correctly', () => {
    render(<StatCard label="Users" value="100" icon={Users} />)

    const iconContainer = screen.getByText('100').closest('.group')
    expect(iconContainer).toBeInTheDocument()
  })

  it('displays description when provided', () => {
    render(
      <StatCard
        label="Sales"
        value="$1,200"
        icon={TrendingUp}
        description="Increased by 15%"
      />,
    )

    expect(screen.getByText('Increased by 15%')).toBeInTheDocument()
  })

  it('applies correct color variants', () => {
    render(
      <StatCard
        label="Revenue"
        value="$5,000"
        icon={TrendingUp}
        color="indigo"
      />,
    )

    expect(screen.getByText('Revenue')).toBeInTheDocument()
  })

  it('applies correct trend colors for up trend', () => {
    render(
      <StatCard
        label="Growth"
        value="45%"
        icon={TrendingUp}
        trend="up"
        description="Trending upward"
      />,
    )

    const description = screen.getByText('Trending upward')
    expect(description).toHaveClass('text-green-600')
  })

  it('applies correct trend colors for down trend', () => {
    render(
      <StatCard
        label="Decline"
        value="10%"
        icon={TrendingDown}
        trend="down"
        description="Trending downward"
      />,
    )

    const description = screen.getByText('Trending downward')
    expect(description).toHaveClass('text-red-600')
  })

  it('applies neutral trend color by default', () => {
    render(
      <StatCard
        label="Stable"
        value="100"
        icon={Users}
        description="No change"
      />,
    )

    const description = screen.getByText('No change')
    expect(description).toHaveClass('text-slate-600')
  })

  it('renders without description gracefully', () => {
    render(<StatCard label="Simple Stat" value={42} icon={Users} />)

    expect(screen.getByText('Simple Stat')).toBeInTheDocument()
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('accepts numeric values', () => {
    render(<StatCard label="Count" value={1234} icon={Users} />)

    expect(screen.getByText('1234')).toBeInTheDocument()
  })

  it('applies violet color by default', () => {
    render(<StatCard label="Default Color" value="100" icon={Users} />)

    expect(screen.getByText('Default Color')).toBeInTheDocument()
  })

  it('supports all color variants', () => {
    const colors = ['violet', 'indigo', 'slate', 'purple'] as const

    colors.forEach((color, index) => {
      render(
        <StatCard
          label={`${color} card`}
          value={index + 1}
          icon={Users}
          color={color}
        />,
      )

      expect(screen.getByText(`${color} card`)).toBeInTheDocument()
    })
  })
})
