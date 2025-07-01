import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Table } from '@/components/table'

describe('Table Component', () => {
  describe('Table.Root', () => {
    it('renders table root correctly', () => {
      render(
        <Table.Root>
          <tbody>
            <tr>
              <td>Cell</td>
            </tr>
          </tbody>
        </Table.Root>,
      )

      expect(screen.getByRole('table')).toBeInTheDocument()
    })
  })

  describe('Table.Header', () => {
    it('renders table header correctly', () => {
      render(
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.HeadCell>Name</Table.HeadCell>
            </Table.Row>
          </Table.Header>
        </Table.Root>,
      )

      expect(screen.getByText('Name')).toBeInTheDocument()
    })
  })

  describe('Table.Body', () => {
    it('renders table body correctly', () => {
      render(
        <Table.Root>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Data</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>,
      )

      expect(screen.getByText('Data')).toBeInTheDocument()
    })
  })

  describe('Table.Action', () => {
    it('handles click events', () => {
      const mockOnClick = jest.fn()

      render(
        <Table.Root>
          <Table.Body>
            <Table.Row>
              <Table.Action onClick={mockOnClick}>Delete</Table.Action>
            </Table.Row>
          </Table.Body>
        </Table.Root>,
      )

      fireEvent.click(screen.getByText('Delete'))
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Table.EmptyState', () => {
    it('renders empty state correctly', () => {
      render(
        <Table.Root>
          <Table.Body>
            <Table.EmptyState colSpan={3} title="No data available" />
          </Table.Body>
        </Table.Root>,
      )

      expect(screen.getByText('No data available')).toBeInTheDocument()
    })
  })
})
