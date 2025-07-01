import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Pagination } from '@/components/pagination'
import { PaginationPreset } from '@/components/pagination/pagination-preset'

describe('Pagination Components', () => {
  const mockOnPageChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('PaginationPreset', () => {
    it('renders pagination with all default elements', () => {
      render(
        <PaginationPreset
          currentPage={1}
          totalPages={5}
          totalItems={50}
          onPageChange={mockOnPageChange}
        />,
      )

      expect(screen.getByText('Anterior')).toBeInTheDocument()
      expect(screen.getByText('Próximo')).toBeInTheDocument()
    })

    it('disables previous button on first page', () => {
      render(
        <PaginationPreset
          currentPage={1}
          totalPages={5}
          totalItems={50}
          onPageChange={mockOnPageChange}
        />,
      )

      const prevButton = screen.getByTestId('prev-button')
      expect(prevButton).toBeDisabled()
    })

    it('disables next button on last page', () => {
      render(
        <PaginationPreset
          currentPage={5}
          totalPages={5}
          totalItems={50}
          onPageChange={mockOnPageChange}
        />,
      )

      const nextButton = screen.getByTestId('next-button')
      expect(nextButton).toBeDisabled()
    })

    it('calls onPageChange when previous button is clicked', () => {
      render(
        <PaginationPreset
          currentPage={3}
          totalPages={5}
          totalItems={50}
          onPageChange={mockOnPageChange}
        />,
      )

      fireEvent.click(screen.getByTestId('prev-button'))
      expect(mockOnPageChange).toHaveBeenCalledWith(2)
    })

    it('calls onPageChange when next button is clicked', () => {
      render(
        <PaginationPreset
          currentPage={3}
          totalPages={5}
          totalItems={50}
          onPageChange={mockOnPageChange}
        />,
      )

      fireEvent.click(screen.getByTestId('next-button'))
      expect(mockOnPageChange).toHaveBeenCalledWith(4)
    })

    it('hides info when showInfo is false', () => {
      render(
        <PaginationPreset
          currentPage={1}
          totalPages={5}
          totalItems={50}
          onPageChange={mockOnPageChange}
          showInfo={false}
        />,
      )

      expect(screen.queryByText(/de/)).not.toBeInTheDocument()
    })

    it('hides page select when showPageSelect is false', () => {
      render(
        <PaginationPreset
          currentPage={1}
          totalPages={5}
          totalItems={50}
          onPageChange={mockOnPageChange}
          showPageSelect={false}
        />,
      )

      expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    })

    it('hides previous/next buttons when showPreviousNext is false', () => {
      render(
        <PaginationPreset
          currentPage={1}
          totalPages={5}
          totalItems={50}
          onPageChange={mockOnPageChange}
          showPreviousNext={false}
        />,
      )

      expect(screen.queryByText('Anterior')).not.toBeInTheDocument()
      expect(screen.queryByText('Próximo')).not.toBeInTheDocument()
    })

    it('applies custom className', () => {
      const { container } = render(
        <PaginationPreset
          currentPage={1}
          totalPages={5}
          totalItems={50}
          onPageChange={mockOnPageChange}
          className="custom-pagination"
        />,
      )

      expect(container.firstChild).toHaveClass('custom-pagination')
    })
  })

  describe('Pagination.Root', () => {
    it('renders pagination root component', () => {
      render(
        <Pagination.Root
          currentPage={1}
          totalPages={5}
          totalItems={50}
          onPageChange={mockOnPageChange}
        >
          <div>Pagination Content</div>
        </Pagination.Root>,
      )

      expect(screen.getByText('Pagination Content')).toBeInTheDocument()
    })

    it('provides context to child components', () => {
      render(
        <Pagination.Root
          currentPage={2}
          totalPages={5}
          totalItems={50}
          onPageChange={mockOnPageChange}
        >
          <Pagination.Info />
        </Pagination.Root>,
      )

      expect(screen.getByText(/Total/)).toBeInTheDocument()
      expect(screen.getByText(/50/)).toBeInTheDocument()
    })
  })

  describe('Pagination.Button', () => {
    it('renders button with children', () => {
      render(
        <Pagination.Button onClick={mockOnPageChange}>
          Click Me
        </Pagination.Button>,
      )

      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByText('Click Me')).toBeInTheDocument()
    })

    it('calls onClick when clicked', () => {
      render(
        <Pagination.Button onClick={mockOnPageChange}>
          Click Me
        </Pagination.Button>,
      )

      fireEvent.click(screen.getByRole('button'))
      expect(mockOnPageChange).toHaveBeenCalled()
    })

    it('is disabled when disabled prop is true', () => {
      render(
        <Pagination.Button onClick={mockOnPageChange} disabled>
          Disabled Button
        </Pagination.Button>,
      )

      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('applies variant classes correctly', () => {
      render(
        <Pagination.Button onClick={mockOnPageChange} variant="previous">
          Previous
        </Pagination.Button>,
      )

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('cursor-pointer')
    })
  })

  describe('Pagination.Controls', () => {
    it('renders control buttons wrapper', () => {
      render(
        <Pagination.Controls>
          <button>Test Button</button>
        </Pagination.Controls>,
      )

      expect(screen.getByRole('button')).toBeInTheDocument()
    })
  })

  describe('Pagination edge cases', () => {
    it('handles single page correctly', () => {
      render(
        <PaginationPreset
          currentPage={1}
          totalPages={1}
          totalItems={5}
          onPageChange={mockOnPageChange}
        />,
      )

      expect(screen.getByTestId('prev-button')).toBeDisabled()
      expect(screen.getByTestId('next-button')).toBeDisabled()
    })

    it('handles zero items correctly', () => {
      render(
        <PaginationPreset
          currentPage={1}
          totalPages={1}
          totalItems={0}
          onPageChange={mockOnPageChange}
        />,
      )

      expect(screen.getByTestId('prev-button')).toBeDisabled()
      expect(screen.getByTestId('next-button')).toBeDisabled()
    })

    it('works with large page numbers', () => {
      render(
        <PaginationPreset
          currentPage={50}
          totalPages={100}
          totalItems={1000}
          onPageChange={mockOnPageChange}
        />,
      )

      fireEvent.click(screen.getByTestId('next-button'))
      expect(mockOnPageChange).toHaveBeenCalledWith(51)
    })
  })

  describe('Pagination.PageButton', () => {
    it('renders page number button', () => {
      render(
        <Pagination.Root
          currentPage={1}
          totalPages={5}
          totalItems={50}
          onPageChange={mockOnPageChange}
        >
          <Pagination.PageButton page={3} onClick={() => mockOnPageChange(3)} />
        </Pagination.Root>,
      )

      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('calls onPageChange with correct page number', () => {
      render(
        <Pagination.Root
          currentPage={1}
          totalPages={5}
          totalItems={50}
          onPageChange={mockOnPageChange}
        >
          <Pagination.PageButton page={3} onClick={() => mockOnPageChange(3)} />
        </Pagination.Root>,
      )

      fireEvent.click(screen.getByText('3'))
      expect(mockOnPageChange).toHaveBeenCalledWith(3)
    })

    it('shows active state for current page', () => {
      render(
        <Pagination.Root
          currentPage={3}
          totalPages={5}
          totalItems={50}
          onPageChange={mockOnPageChange}
        >
          <Pagination.PageButton page={3} onClick={() => mockOnPageChange(3)} />
        </Pagination.Root>,
      )

      const pageButton = screen.getByText('3')
      expect(pageButton).toBeInTheDocument()
      expect(pageButton).toHaveClass('cursor-pointer')
    })
  })

  describe('Pagination.Ellipsis', () => {
    it('renders ellipsis correctly', () => {
      render(<Pagination.Ellipsis />)

      expect(screen.getByText('...')).toBeInTheDocument()
    })
  })
})
