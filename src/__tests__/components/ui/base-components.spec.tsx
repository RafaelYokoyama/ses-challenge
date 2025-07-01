import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import {
  Card,
  SectionHeader,
  Block,
  Grid,
  Section,
} from '@/components/ui/base-components'
import { Users } from 'lucide-react'

describe('Base Components', () => {
  describe('Card', () => {
    it('renders children correctly', () => {
      render(
        <Card>
          <div>Test Content</div>
        </Card>,
      )

      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('applies correct variant classes', () => {
      const { container } = render(
        <Card variant="gradient">
          <div>Test</div>
        </Card>,
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('bg-gradient-to-br')
    })

    it('applies correct size classes', () => {
      const { container } = render(
        <Card size="lg">
          <div>Test</div>
        </Card>,
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('p-8')
    })

    it('applies hover effects when enabled', () => {
      const { container } = render(
        <Card hover>
          <div>Test</div>
        </Card>,
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('hover:shadow-xl')
    })

    it('applies custom className', () => {
      const { container } = render(
        <Card className="custom-class">
          <div>Test</div>
        </Card>,
      )

      const card = container.firstChild as HTMLElement
      expect(card).toHaveClass('custom-class')
    })
  })

  describe('SectionHeader', () => {
    it('renders title correctly', () => {
      render(<SectionHeader title="Test Title" />)

      expect(screen.getByText('Test Title')).toBeInTheDocument()
    })

    it('renders with icon', () => {
      render(<SectionHeader icon={Users} title="Users Section" />)

      expect(screen.getByText('Users Section')).toBeInTheDocument()
    })

    it('renders subtitle when provided', () => {
      render(<SectionHeader title="Main Title" subtitle="This is a subtitle" />)

      expect(screen.getByText('Main Title')).toBeInTheDocument()
      expect(screen.getByText('This is a subtitle')).toBeInTheDocument()
    })

    it('applies correct size classes', () => {
      render(<SectionHeader title="Large Title" size="lg" />)

      const title = screen.getByText('Large Title')
      expect(title).toHaveClass('text-3xl')
    })

    it('applies correct color classes', () => {
      render(<SectionHeader icon={Users} title="Title" color="indigo" />)

      const iconContainer = screen.getByText('Title').closest('h2')
      expect(iconContainer).toBeInTheDocument()
    })
  })

  describe('Block', () => {
    it('renders children and title', () => {
      render(
        <Block title="Block Title">
          <p>Block content</p>
        </Block>,
      )

      expect(screen.getByText('Block Title')).toBeInTheDocument()
      expect(screen.getByText('Block content')).toBeInTheDocument()
    })

    it('renders without title', () => {
      render(
        <Block>
          <p>Content only</p>
        </Block>,
      )

      expect(screen.getByText('Content only')).toBeInTheDocument()
    })

    it('applies correct variant classes', () => {
      const { container } = render(
        <Block variant="highlighted">
          <p>Highlighted content</p>
        </Block>,
      )

      const block = container.firstChild as HTMLElement
      expect(block).toHaveClass('bg-gradient-to-r', 'from-violet-100')
    })

    it('applies correct padding classes', () => {
      const { container } = render(
        <Block padding="lg">
          <p>Large padding content</p>
        </Block>,
      )

      const block = container.firstChild as HTMLElement
      expect(block).toHaveClass('p-6')
    })
  })

  describe('Grid', () => {
    it('renders children in grid layout', () => {
      render(
        <Grid>
          <div>Item 1</div>
          <div>Item 2</div>
        </Grid>,
      )

      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
    })

    it('applies correct column classes', () => {
      const { container } = render(
        <Grid cols={3}>
          <div>Item</div>
        </Grid>,
      )

      const grid = container.firstChild as HTMLElement
      expect(grid).toHaveClass('grid-cols-1', 'lg:grid-cols-3')
    })

    it('applies non-responsive grid when specified', () => {
      const { container } = render(
        <Grid cols={2} responsive={false}>
          <div>Item</div>
        </Grid>,
      )

      const grid = container.firstChild as HTMLElement
      expect(grid).toHaveClass('grid-cols-2')
      expect(grid).not.toHaveClass('lg:grid-cols-2')
    })

    it('applies correct gap classes', () => {
      const { container } = render(
        <Grid gap="lg">
          <div>Item</div>
        </Grid>,
      )

      const grid = container.firstChild as HTMLElement
      expect(grid).toHaveClass('gap-8')
    })

    it('applies custom className', () => {
      const { container } = render(
        <Grid className="custom-grid">
          <div>Item</div>
        </Grid>,
      )

      const grid = container.firstChild as HTMLElement
      expect(grid).toHaveClass('custom-grid')
    })
  })

  describe('Section', () => {
    it('renders children correctly', () => {
      render(
        <Section>
          <div>Section content</div>
        </Section>,
      )

      expect(screen.getByText('Section content')).toBeInTheDocument()
    })

    it('applies correct spacing classes', () => {
      const { container } = render(
        <Section spacing="lg">
          <div>Content</div>
        </Section>,
      )

      const section = container.firstChild as HTMLElement
      expect(section).toHaveClass('mb-12')
    })

    it('applies custom className', () => {
      const { container } = render(
        <Section className="custom-section">
          <div>Content</div>
        </Section>,
      )

      const section = container.firstChild as HTMLElement
      expect(section).toHaveClass('custom-section')
    })
  })
})
