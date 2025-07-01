import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ConfirmModal, DeleteModal } from '@/components/modal'

describe('Modal Components', () => {
  describe('ConfirmModal', () => {
    it('renders confirm modal when open', () => {
      render(
        <ConfirmModal
          open={true}
          onOpenChange={() => {}}
          onConfirm={() => {}}
          title="Confirm Action"
          description="Are you sure?"
        />,
      )

      expect(screen.getByText('Confirm Action')).toBeInTheDocument()
      expect(screen.getByText('Are you sure?')).toBeInTheDocument()
    })

    it('calls onConfirm when confirm button is clicked', async () => {
      const handleConfirm = jest.fn()
      render(
        <ConfirmModal
          open={true}
          onOpenChange={() => {}}
          onConfirm={handleConfirm}
          title="Confirm"
          description="Confirm this action"
        />,
      )

      const confirmButton = screen.getByRole('button', { name: /confirmar/i })
      fireEvent.click(confirmButton)

      await waitFor(() => {
        expect(handleConfirm).toHaveBeenCalledTimes(1)
      })
    })

    it('calls onOpenChange when cancel button is clicked', () => {
      const handleOpenChange = jest.fn()
      render(
        <ConfirmModal
          open={true}
          onOpenChange={handleOpenChange}
          onConfirm={() => {}}
          title="Confirm"
          description="Confirm this action"
        />,
      )

      const cancelButton = screen.getByRole('button', { name: /cancelar/i })
      fireEvent.click(cancelButton)

      expect(handleOpenChange).toHaveBeenCalledWith(false)
    })

    it('renders with loading state', () => {
      render(
        <ConfirmModal
          open={true}
          onOpenChange={() => {}}
          onConfirm={() => {}}
          title="Confirm"
          description="Loading..."
          isLoading={true}
        />,
      )

      const confirmButton = screen.getByRole('button', { name: /processando/i })
      expect(confirmButton).toBeDisabled()
    })

    it('renders with custom confirm button text', () => {
      render(
        <ConfirmModal
          open={true}
          onOpenChange={() => {}}
          onConfirm={() => {}}
          title="Save Changes"
          description="Save your changes?"
          confirmText="Save"
        />,
      )

      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    })

    it('renders with custom cancel button text', () => {
      render(
        <ConfirmModal
          open={true}
          onOpenChange={() => {}}
          onConfirm={() => {}}
          title="Discard Changes"
          description="Discard your changes?"
          cancelText="Keep Editing"
        />,
      )

      expect(
        screen.getByRole('button', { name: 'Keep Editing' }),
      ).toBeInTheDocument()
    })
  })

  describe('DeleteModal', () => {
    const defaultProps = {
      open: true,
      onOpenChange: jest.fn(),
      onConfirm: jest.fn(),
      title: 'Delete Item',
      description: 'This action cannot be undone',
      entityName: 'Test Item',
    }

    it('renders delete modal with entity name', () => {
      render(<DeleteModal {...defaultProps} />)

      expect(screen.getByText('Delete Item')).toBeInTheDocument()
      expect(
        screen.getByText('This action cannot be undone'),
      ).toBeInTheDocument()
    })

    it('calls onConfirm when delete button is clicked', async () => {
      const handleConfirm = jest.fn()
      render(<DeleteModal {...defaultProps} onConfirm={handleConfirm} />)

      const deleteButton = screen.getByRole('button', { name: /excluir/i })
      fireEvent.click(deleteButton)

      await waitFor(() => {
        expect(handleConfirm).toHaveBeenCalledTimes(1)
      })
    })

    it('applies destructive styling to delete button', () => {
      render(<DeleteModal {...defaultProps} />)

      const deleteButton = screen.getByRole('button', { name: /excluir/i })
      expect(deleteButton).toHaveClass('bg-red-500')
    })

    it('renders with loading state', () => {
      render(<DeleteModal {...defaultProps} isLoading={true} />)

      const deleteButton = screen.getByRole('button', {
        name: /🔄 processando/i,
      })
      expect(deleteButton).toBeDisabled()
    })

    it('shows loading text when loading', () => {
      render(<DeleteModal {...defaultProps} isLoading={true} />)

      expect(screen.getByText(/🔄 processando/i)).toBeInTheDocument()
    })
  })

  describe('Modal Integration', () => {
    it('handles sequential modal operations', async () => {
      const Component = () => {
        const [showConfirm, setShowConfirm] = React.useState(false)
        const [showDelete, setShowDelete] = React.useState(false)

        return (
          <div>
            <button onClick={() => setShowConfirm(true)}>Show Confirm</button>
            <button onClick={() => setShowDelete(true)}>Show Delete</button>

            <ConfirmModal
              open={showConfirm}
              onOpenChange={setShowConfirm}
              onConfirm={() => {
                setShowConfirm(false)
                setShowDelete(true)
              }}
              title="First Step"
              description="Continue to deletion?"
            />

            <DeleteModal
              open={showDelete}
              onOpenChange={setShowDelete}
              onConfirm={() => setShowDelete(false)}
              title="Delete Item"
              description="Final step"
              entityName="Test"
            />
          </div>
        )
      }

      render(<Component />)

      fireEvent.click(screen.getByText('Show Confirm'))
      expect(screen.getByText('First Step')).toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: /confirmar/i }))

      await waitFor(() => {
        expect(screen.getByText('Delete Item')).toBeInTheDocument()
      })
    })
  })
})
