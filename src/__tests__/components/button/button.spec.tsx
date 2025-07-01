import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button, IconButton, LoadingButton } from '@/components/button'
import { Plus } from 'lucide-react'

describe('Button Components', () => {
  describe('Button Root', () => {
    it('renders children correctly', () => {
      render(<Button.Root>Click me</Button.Root>)

      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByText('Click me')).toBeInTheDocument()
    })

    it('handles click events', () => {
      const handleClick = jest.fn()
      render(<Button.Root onClick={handleClick}>Click me</Button.Root>)

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('applies variant classes correctly', () => {
      render(<Button.Root variant="secondary">Secondary</Button.Root>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-secondary')
    })

    it('applies size classes correctly', () => {
      render(<Button.Root size="lg">Large Button</Button.Root>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10', 'px-6')
    })

    it('is disabled when disabled prop is true', () => {
      render(<Button.Root disabled>Disabled Button</Button.Root>)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('applies custom className', () => {
      render(<Button.Root className="custom-class">Custom Button</Button.Root>)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })
  })

  describe('Button Compound Component', () => {
    it('renders Button.Root correctly', () => {
      render(<Button.Root>Button Root</Button.Root>)

      expect(screen.getByText('Button Root')).toBeInTheDocument()
    })

    it('renders Button.Icon correctly', () => {
      render(<Button.Icon icon={<Plus />} aria-label="Add item" />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-label', 'Add item')
    })

    it('renders Button.Loading correctly', () => {
      render(<Button.Loading isLoading={false}>Loading Button</Button.Loading>)

      expect(screen.getByText('Loading Button')).toBeInTheDocument()
    })
  })

  describe('IconButton', () => {
    it('renders icon correctly', () => {
      render(<IconButton icon={<Plus />} aria-label="Add item" />)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-label', 'Add item')
    })

    it('handles click events', () => {
      const handleClick = jest.fn()
      render(
        <IconButton icon={<Plus />} onClick={handleClick} aria-label="Add" />,
      )

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('applies variant classes', () => {
      render(<IconButton icon={<Plus />} variant="ghost" aria-label="Add" />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('hover:bg-accent')
    })

    it('applies size classes', () => {
      render(<IconButton icon={<Plus />} size="lg" aria-label="Add" />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10', 'px-6')
    })

    it('is disabled when disabled prop is true', () => {
      render(<IconButton icon={<Plus />} disabled aria-label="Add" />)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })

  describe('LoadingButton', () => {
    it('renders children when not loading', () => {
      render(<LoadingButton isLoading={false}>Save Changes</LoadingButton>)

      expect(screen.getByText('Save Changes')).toBeInTheDocument()
    })

    it('shows loading state when loading', () => {
      render(<LoadingButton isLoading={true}>Save Changes</LoadingButton>)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('shows custom loading text', () => {
      render(
        <LoadingButton isLoading={true} loadingText="Saving...">
          Save Changes
        </LoadingButton>,
      )

      expect(screen.getByText('Saving...')).toBeInTheDocument()
    })

    it('handles click when not loading', () => {
      const handleClick = jest.fn()
      render(
        <LoadingButton isLoading={false} onClick={handleClick}>
          Save
        </LoadingButton>,
      )

      fireEvent.click(screen.getByRole('button'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not handle click when loading', () => {
      const handleClick = jest.fn()
      render(
        <LoadingButton isLoading={true} onClick={handleClick}>
          Save
        </LoadingButton>,
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('applies variant and size props', () => {
      render(
        <LoadingButton variant="outline" size="sm" isLoading={false}>
          Small Outline
        </LoadingButton>,
      )

      const button = screen.getByRole('button')
      expect(button).toHaveClass('border', 'bg-background')
      expect(button).toHaveClass('h-8', 'px-3')
    })

    it('maintains disabled state when loading is false but disabled is true', () => {
      render(
        <LoadingButton isLoading={false} disabled={true}>
          Disabled
        </LoadingButton>,
      )

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })

  describe('Button Integration', () => {
    it('renders all button types together', () => {
      render(
        <div>
          <Button.Root>Regular Button</Button.Root>
          <IconButton icon={<Plus />} aria-label="Add" />
          <LoadingButton isLoading={false}>Loading Button</LoadingButton>
        </div>,
      )

      expect(screen.getByText('Regular Button')).toBeInTheDocument()
      expect(screen.getByLabelText('Add')).toBeInTheDocument()
      expect(screen.getByText('Loading Button')).toBeInTheDocument()
    })

    it('handles async operations with LoadingButton', async () => {
      const Component = () => {
        const [loading, setLoading] = React.useState(false)

        const handleClick = async () => {
          setLoading(true)
          await new Promise((resolve) => setTimeout(resolve, 100))
          setLoading(false)
        }

        return (
          <LoadingButton
            isLoading={loading}
            onClick={handleClick}
            loadingText="Processing..."
          >
            Process
          </LoadingButton>
        )
      }

      render(<Component />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByText('Processing...')).toBeInTheDocument()
      })

      await waitFor(
        () => {
          expect(screen.getByText('Process')).toBeInTheDocument()
        },
        { timeout: 200 },
      )
    })
  })
})
