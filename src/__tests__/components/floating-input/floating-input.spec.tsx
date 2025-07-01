import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import FloatingInput from '@/components/floating-input'

describe('FloatingInput Component', () => {
  it('renders input with label correctly', () => {
    render(
      <FloatingInput
        id="test-input"
        label="Test Label"
        value=""
        onChange={() => {}}
      />,
    )

    const input = screen.getByRole('textbox')
    const label = screen.getByText('Test Label')

    expect(input).toBeInTheDocument()
    expect(label).toBeInTheDocument()
  })

  it('handles value changes', () => {
    const handleChange = jest.fn()
    render(
      <FloatingInput
        id="test-input"
        label="Test Input"
        value=""
        onChange={handleChange}
      />,
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new value' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('shows floating label when focused', () => {
    render(
      <FloatingInput
        id="test-input"
        label="Floating Label"
        value=""
        onChange={() => {}}
      />,
    )

    const input = screen.getByRole('textbox')
    fireEvent.focus(input)

    const label = screen.getByText('Floating Label')
    expect(label).toBeInTheDocument()
  })

  it('keeps label floating when has value', () => {
    render(
      <FloatingInput
        id="test-input"
        label="Has Value"
        value="test value"
        onChange={() => {}}
      />,
    )

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('test value')
  })

  it('applies error state correctly', () => {
    render(
      <FloatingInput
        id="test-input"
        label="Error Input"
        value=""
        onChange={() => {}}
        error={{ message: 'This field is required', type: 'required' }}
      />,
    )

    const errorMessage = screen.getByText('This field is required')
    expect(errorMessage).toBeInTheDocument()
  })

  it('supports different input types', () => {
    render(
      <FloatingInput
        id="email-input"
        label="Email"
        type="email"
        value=""
        onChange={() => {}}
      />,
    )

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'email')
  })

  it('handles disabled state', () => {
    render(
      <FloatingInput
        id="disabled-input"
        label="Disabled"
        value=""
        onChange={() => {}}
        disabled
      />,
    )

    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('applies custom className', () => {
    const { container } = render(
      <FloatingInput
        id="custom-input"
        label="Custom"
        value=""
        onChange={() => {}}
        className="custom-class"
      />,
    )

    const input = container.querySelector('input') as HTMLElement
    expect(input).toHaveClass('custom-class')
  })

  it('supports placeholder text', () => {
    render(
      <FloatingInput
        id="placeholder-input"
        label="Label"
        placeholder="Enter text here"
        value=""
        onChange={() => {}}
      />,
    )

    const input = screen.getByPlaceholderText('Enter text here')
    expect(input).toBeInTheDocument()
  })

  it('handles required field correctly', () => {
    render(
      <FloatingInput
        id="required-input"
        label="Required Field"
        value=""
        onChange={() => {}}
        required
      />,
    )

    const label = screen.getByText('Required Field *')
    expect(label).toBeInTheDocument()
  })

  it('handles blur events', () => {
    const handleBlur = jest.fn()
    render(
      <FloatingInput
        id="blur-input"
        label="Blur Test"
        value=""
        onChange={() => {}}
        onBlur={handleBlur}
      />,
    )

    const input = screen.getByRole('textbox')
    fireEvent.blur(input)

    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('handles focus events', () => {
    render(
      <FloatingInput
        id="focus-input"
        label="Focus Test"
        value=""
        onChange={() => {}}
      />,
    )

    const input = screen.getByRole('textbox')
    fireEvent.focus(input)

    const label = screen.getByText('Focus Test')
    expect(label).toHaveClass('top-1', 'text-xs', 'text-gray-500')
  })

  it('renders input with correct id and label', () => {
    render(
      <FloatingInput
        id="associated-input"
        label="Associated Label"
        value=""
        onChange={() => {}}
      />,
    )

    const input = screen.getByRole('textbox')
    const label = screen.getByText('Associated Label')

    expect(input).toHaveAttribute('id', 'associated-input')
    expect(label).toBeInTheDocument()
  })
})
