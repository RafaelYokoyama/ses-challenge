import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AlertDialog } from '@/components/alert-dialog'

describe('AlertDialog Components', () => {
  const mockOnOpenChange = jest.fn()
  const mockOnAction = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('AlertDialog.Root', () => {
    it('renders children correctly', () => {
      render(
        <AlertDialog.Root>
          <div data-testid="child">Test Child</div>
        </AlertDialog.Root>,
      )

      expect(screen.getByTestId('child')).toBeInTheDocument()
    })

    it('handles open state changes', () => {
      render(
        <AlertDialog.Root onOpenChange={mockOnOpenChange} open={true}>
          <AlertDialog.Trigger>Open Dialog</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Test Title</AlertDialog.Title>
                <AlertDialog.Description>
                  Test Description
                </AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action>Action</AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>,
      )

      expect(screen.getByText('Test Title')).toBeInTheDocument()
    })
  })

  describe('AlertDialog.Trigger', () => {
    it('renders trigger button correctly', () => {
      render(
        <AlertDialog.Root>
          <AlertDialog.Trigger>Open Alert</AlertDialog.Trigger>
        </AlertDialog.Root>,
      )

      expect(screen.getByText('Open Alert')).toBeInTheDocument()
    })

    it('opens dialog when clicked', async () => {
      render(
        <AlertDialog.Root>
          <AlertDialog.Trigger>Open Alert</AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Dialog Title</AlertDialog.Title>
                <AlertDialog.Description>
                  Dialog Description
                </AlertDialog.Description>
              </AlertDialog.Header>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>,
      )

      fireEvent.click(screen.getByText('Open Alert'))

      await waitFor(() => {
        expect(screen.getByText('Dialog Title')).toBeInTheDocument()
      })
    })
  })

  describe('AlertDialog.Content', () => {
    it('renders content with title and description', () => {
      render(
        <AlertDialog.Root open={true}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Alert Title</AlertDialog.Title>
                <AlertDialog.Description>
                  Alert Description
                </AlertDialog.Description>
              </AlertDialog.Header>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>,
      )

      expect(screen.getByText('Alert Title')).toBeInTheDocument()
      expect(screen.getByText('Alert Description')).toBeInTheDocument()
    })
  })

  describe('AlertDialog.Title', () => {
    it('renders title text correctly', () => {
      render(
        <AlertDialog.Root open={true}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Custom Title</AlertDialog.Title>
                <AlertDialog.Description>
                  Required Description
                </AlertDialog.Description>
              </AlertDialog.Header>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>,
      )

      expect(screen.getByText('Custom Title')).toBeInTheDocument()
    })
  })

  describe('AlertDialog.Description', () => {
    it('renders description text correctly', () => {
      render(
        <AlertDialog.Root open={true}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Title</AlertDialog.Title>
                <AlertDialog.Description>
                  Custom Description Text
                </AlertDialog.Description>
              </AlertDialog.Header>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>,
      )

      expect(screen.getByText('Custom Description Text')).toBeInTheDocument()
    })
  })

  describe('AlertDialog.Action', () => {
    it('renders action button correctly', () => {
      render(
        <AlertDialog.Root open={true}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Title</AlertDialog.Title>
                <AlertDialog.Description>Description</AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Action onClick={mockOnAction}>
                  Confirm
                </AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>,
      )

      expect(screen.getByText('Confirm')).toBeInTheDocument()
    })

    it('calls onClick when action button is clicked', () => {
      render(
        <AlertDialog.Root open={true}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Title</AlertDialog.Title>
                <AlertDialog.Description>Description</AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Action onClick={mockOnAction}>
                  Confirm
                </AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>,
      )

      fireEvent.click(screen.getByText('Confirm'))
      expect(mockOnAction).toHaveBeenCalledTimes(1)
    })
  })

  describe('AlertDialog.Cancel', () => {
    it('renders cancel button correctly', () => {
      render(
        <AlertDialog.Root open={true}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Title</AlertDialog.Title>
                <AlertDialog.Description>Description</AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel onClick={mockOnCancel}>
                  Cancel
                </AlertDialog.Cancel>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>,
      )

      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })

    it('calls onClick when cancel button is clicked', () => {
      render(
        <AlertDialog.Root open={true}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Title</AlertDialog.Title>
                <AlertDialog.Description>Description</AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel onClick={mockOnCancel}>
                  Cancel
                </AlertDialog.Cancel>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>,
      )

      fireEvent.click(screen.getByText('Cancel'))
      expect(mockOnCancel).toHaveBeenCalledTimes(1)
    })
  })

  describe('AlertDialog.Footer', () => {
    it('renders footer with action buttons', () => {
      render(
        <AlertDialog.Root open={true}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Title</AlertDialog.Title>
                <AlertDialog.Description>Description</AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action>Confirm</AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>,
      )

      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('Confirm')).toBeInTheDocument()
    })
  })

  describe('AlertDialog Integration', () => {
    it('renders complete alert dialog with all components', () => {
      render(
        <AlertDialog.Root open={true}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Delete Item</AlertDialog.Title>
                <AlertDialog.Description>
                  This action cannot be undone. This will permanently delete the
                  item.
                </AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action>Delete</AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>,
      )

      expect(screen.getByText('Delete Item')).toBeInTheDocument()
      expect(
        screen.getByText(
          'This action cannot be undone. This will permanently delete the item.',
        ),
      ).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })

    it('handles keyboard navigation', () => {
      render(
        <AlertDialog.Root open={true}>
          <AlertDialog.Portal>
            <AlertDialog.Overlay />
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Confirm Action</AlertDialog.Title>
                <AlertDialog.Description>
                  Are you sure you want to proceed?
                </AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action>Proceed</AlertDialog.Action>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>,
      )

      const cancelButton = screen.getByText('Cancel')
      const proceedButton = screen.getByText('Proceed')

      expect(cancelButton).toBeInTheDocument()
      expect(proceedButton).toBeInTheDocument()
    })
  })
})
