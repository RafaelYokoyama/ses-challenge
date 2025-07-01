import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HeroSection from '@/components/hero-section'

describe('HeroSection Component', () => {
  describe('HeroSection Root', () => {
    it('renders section element correctly', () => {
      const { container } = render(
        <HeroSection>
          <div>Test Content</div>
        </HeroSection>,
      )

      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('bg-[#8556AA]')
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(
        <HeroSection className="custom-hero">
          <div>Content</div>
        </HeroSection>,
      )

      const section = container.querySelector('section')
      expect(section).toHaveClass('custom-hero')
    })

    it('renders children correctly', () => {
      render(
        <HeroSection>
          <div>Child 1</div>
          <div>Child 2</div>
        </HeroSection>,
      )

      expect(screen.getByText('Child 1')).toBeInTheDocument()
      expect(screen.getByText('Child 2')).toBeInTheDocument()
    })

    it('has proper styling classes', () => {
      const { container } = render(
        <HeroSection>
          <div>Content</div>
        </HeroSection>,
      )

      const section = container.querySelector('section')
      expect(section).toHaveClass('bg-[#8556AA]')
      expect(section).toHaveClass('lg:h-[100px]')
      expect(section).toHaveClass('h-20')
    })
  })

  describe('HeroSection.Item', () => {
    const mockIcon = <span data-testid="icon">📍</span>

    it('renders item with icon, title and subtitle', () => {
      render(
        <HeroSection.Item
          icon={mockIcon}
          title="Test Title"
          subtitle="Test Subtitle"
        />,
      )

      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
    })

    it('renders icon with proper styling', () => {
      render(
        <HeroSection.Item icon={mockIcon} title="Title" subtitle="Subtitle" />,
      )

      const iconContainer = screen.getByTestId('icon').parentElement
      expect(iconContainer).toHaveClass('bg-white')
      expect(iconContainer).toHaveClass('text-[#8556AA]')
      expect(iconContainer).toHaveClass('rounded-sm')
    })

    it('renders title with correct styling', () => {
      render(
        <HeroSection.Item
          icon={mockIcon}
          title="Test Title"
          subtitle="Test Subtitle"
        />,
      )

      const title = screen.getByText('Test Title')
      expect(title).toHaveClass('lg:text-sm')
      expect(title).toHaveClass('text-[9px]')
      expect(title).toHaveClass('font-semibold')
    })

    it('renders subtitle with correct styling', () => {
      render(
        <HeroSection.Item
          icon={mockIcon}
          title="Test Title"
          subtitle="Test Subtitle"
        />,
      )

      const subtitle = screen.getByText('Test Subtitle')
      expect(subtitle).toHaveClass('lg:text-sm')
      expect(subtitle).toHaveClass('text-xs')
      expect(subtitle).toHaveClass('font-extralight')
    })
  })

  describe('HeroSection.Icon', () => {
    const mockIcon = <span data-testid="hero-icon">🏠</span>

    it('renders icon variant with icon, title and subtitle', () => {
      render(
        <HeroSection.Icon
          icon={mockIcon}
          title="Icon Title"
          subtitle="Icon Subtitle"
        />,
      )

      expect(screen.getByTestId('hero-icon')).toBeInTheDocument()
      expect(screen.getByText('Icon Title')).toBeInTheDocument()
      expect(screen.getByText('Icon Subtitle')).toBeInTheDocument()
    })

    it('renders icon with white text color', () => {
      render(
        <HeroSection.Icon icon={mockIcon} title="Title" subtitle="Subtitle" />,
      )

      const iconContainer = screen.getByTestId('hero-icon').parentElement
      expect(iconContainer).toHaveClass('text-white')
    })

    it('renders title with correct styling', () => {
      render(
        <HeroSection.Icon
          icon={mockIcon}
          title="Icon Title"
          subtitle="Icon Subtitle"
        />,
      )

      const title = screen.getByText('Icon Title')
      expect(title).toHaveClass('lg:text-sm')
      expect(title).toHaveClass('text-[9px]')
      expect(title).toHaveClass('font-semibold')
    })

    it('renders subtitle with correct styling', () => {
      render(
        <HeroSection.Icon
          icon={mockIcon}
          title="Icon Title"
          subtitle="Icon Subtitle"
        />,
      )

      const subtitle = screen.getByText('Icon Subtitle')
      expect(subtitle).toHaveClass('lg:text-sm')
      expect(subtitle).toHaveClass('text-[9px]')
      expect(subtitle).toHaveClass('font-extralight')
    })
  })

  describe('HeroSection Composition', () => {
    it('renders complete hero section with multiple items', () => {
      const icon1 = <span data-testid="icon-1">📍</span>
      const icon2 = <span data-testid="icon-2">🏠</span>

      render(
        <HeroSection>
          <HeroSection.Item icon={icon1} title="Location" subtitle="New York" />
          <HeroSection.Icon icon={icon2} title="Home" subtitle="Dashboard" />
        </HeroSection>,
      )

      expect(screen.getByTestId('icon-1')).toBeInTheDocument()
      expect(screen.getByTestId('icon-2')).toBeInTheDocument()
      expect(screen.getByText('Location')).toBeInTheDocument()
      expect(screen.getByText('New York')).toBeInTheDocument()
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
    })

    it('handles responsive layout correctly', () => {
      const { container } = render(
        <HeroSection>
          <HeroSection.Item
            icon={<span>📍</span>}
            title="Title"
            subtitle="Subtitle"
          />
        </HeroSection>,
      )

      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
      const containerDiv = section!.firstChild

      expect(containerDiv).toHaveClass('max-w-[1300px]')
      expect(containerDiv).toHaveClass('mx-auto')
      expect(containerDiv).toHaveClass('text-white')
      expect(containerDiv).toHaveClass('lg:gap-12')
      expect(containerDiv).toHaveClass('gap-4')
    })
  })

  describe('HeroSection Integration', () => {
    it('renders real-world usage example', () => {
      const userIcon = <span data-testid="user-icon">👤</span>
      const statsIcon = <span data-testid="stats-icon">📊</span>

      const { container } = render(
        <HeroSection className="custom-hero">
          <HeroSection.Item
            icon={userIcon}
            title="Total Users"
            subtitle="1,234 active"
          />
          <HeroSection.Icon
            icon={statsIcon}
            title="Analytics"
            subtitle="View reports"
          />
        </HeroSection>,
      )

      const section = container.querySelector('section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveClass('custom-hero')
      expect(screen.getByTestId('user-icon')).toBeInTheDocument()
      expect(screen.getByTestId('stats-icon')).toBeInTheDocument()
      expect(screen.getByText('Total Users')).toBeInTheDocument()
      expect(screen.getByText('1,234 active')).toBeInTheDocument()
      expect(screen.getByText('Analytics')).toBeInTheDocument()
      expect(screen.getByText('View reports')).toBeInTheDocument()
    })
  })
})
