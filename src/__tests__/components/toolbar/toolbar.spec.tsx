import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ToolbarIcons } from '@/components/toolbar'

describe('ToolbarIcons Component', () => {
  describe('Rendering', () => {
    it('renders toolbar icons correctly', () => {
      render(<ToolbarIcons />)

      expect(screen.getByLabelText('Ajuda')).toBeInTheDocument()
      expect(screen.getByLabelText('Aplicativos')).toBeInTheDocument()
    })

    it('renders with proper button structure', () => {
      render(<ToolbarIcons />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)

      expect(buttons[0]).toHaveAttribute('aria-label', 'Ajuda')
      expect(buttons[1]).toHaveAttribute('aria-label', 'Aplicativos')
    })

    it('applies default className', () => {
      const { container } = render(<ToolbarIcons />)

      const toolbar = container.firstChild
      expect(toolbar).toHaveClass('flex')
      expect(toolbar).toHaveClass('items-center')
      expect(toolbar).toHaveClass('gap-2')
      expect(toolbar).toHaveClass('lg:gap-5')
    })

    it('applies custom className', () => {
      const { container } = render(<ToolbarIcons className="custom-toolbar" />)

      const toolbar = container.firstChild
      expect(toolbar).toHaveClass('custom-toolbar')
    })
  })

  describe('Interactions', () => {
    it('handles help button click', () => {
      const mockOnHelpClick = jest.fn()
      render(<ToolbarIcons onHelpClick={mockOnHelpClick} />)

      const helpButton = screen.getByLabelText('Ajuda')
      fireEvent.click(helpButton)

      expect(mockOnHelpClick).toHaveBeenCalledTimes(1)
    })

    it('handles apps button click', () => {
      const mockOnAppsClick = jest.fn()
      render(<ToolbarIcons onAppsClick={mockOnAppsClick} />)

      const appsButton = screen.getByLabelText('Aplicativos')
      fireEvent.click(appsButton)

      expect(mockOnAppsClick).toHaveBeenCalledTimes(1)
    })

    it('handles both button clicks', () => {
      const mockOnHelpClick = jest.fn()
      const mockOnAppsClick = jest.fn()

      render(
        <ToolbarIcons
          onHelpClick={mockOnHelpClick}
          onAppsClick={mockOnAppsClick}
        />,
      )

      fireEvent.click(screen.getByLabelText('Ajuda'))
      fireEvent.click(screen.getByLabelText('Aplicativos'))

      expect(mockOnHelpClick).toHaveBeenCalledTimes(1)
      expect(mockOnAppsClick).toHaveBeenCalledTimes(1)
    })

    it('works without click handlers', () => {
      render(<ToolbarIcons />)

      const helpButton = screen.getByLabelText('Ajuda')
      const appsButton = screen.getByLabelText('Aplicativos')

      expect(() => {
        fireEvent.click(helpButton)
        fireEvent.click(appsButton)
      }).not.toThrow()
    })
  })

  describe('Accessibility', () => {
    it('has proper button attributes', () => {
      render(<ToolbarIcons />)

      const helpButton = screen.getByLabelText('Ajuda')
      const appsButton = screen.getByLabelText('Aplicativos')

      expect(helpButton).toHaveAttribute('type', 'button')
      expect(appsButton).toHaveAttribute('type', 'button')
    })

    it('has proper focus styles', () => {
      render(<ToolbarIcons />)

      const buttons = screen.getAllByRole('button')

      buttons.forEach((button) => {
        expect(button).toHaveClass('focus:outline-none')
        expect(button).toHaveClass('focus:ring-2')
        expect(button).toHaveClass('focus:ring-purple-500')
        expect(button).toHaveClass('focus:ring-offset-2')
      })
    })

    it('has hover effects', () => {
      render(<ToolbarIcons />)

      const buttons = screen.getAllByRole('button')

      buttons.forEach((button) => {
        expect(button).toHaveClass('hover:opacity-70')
        expect(button).toHaveClass('transition-opacity')
      })
    })
  })

  describe('Icon Rendering', () => {
    it('renders help icon', () => {
      render(<ToolbarIcons />)

      const helpButton = screen.getByLabelText('Ajuda')
      const icon = helpButton.querySelector('svg')

      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('w-4')
      expect(icon).toHaveClass('h-4')
      expect(icon).toHaveClass('lg:w-5')
      expect(icon).toHaveClass('lg:h-5')
    })

    it('renders apps icon', () => {
      render(<ToolbarIcons />)

      const appsButton = screen.getByLabelText('Aplicativos')
      const icon = appsButton.querySelector('svg')

      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('w-4')
      expect(icon).toHaveClass('h-4')
      expect(icon).toHaveClass('lg:w-5')
      expect(icon).toHaveClass('lg:h-5')
    })
  })
})
