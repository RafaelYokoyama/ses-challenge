import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import CheckboxGroup from '@/components/checkbox-group'
import { useForm } from 'react-hook-form'
import { CreateUserFormData } from '@/types'

const TestFormWrapper = ({
  options,
  error,
}: {
  options: Array<{ value: string; label: string }>
  error?: { message: string; type: string }
}) => {
  const { register, control, setValue, trigger } = useForm<CreateUserFormData>({
    defaultValues: {
      days: [],
    },
  })

  return (
    <form>
      <CheckboxGroup
        label="Test Group"
        options={options}
        name="days"
        register={register}
        control={control}
        setValue={setValue}
        trigger={trigger}
        error={error}
      />
    </form>
  )
}

describe('CheckboxGroup Component', () => {
  const mockOptions = [
    { value: 'Segunda', label: 'Segunda-feira' },
    { value: 'Terça', label: 'Terça-feira' },
    { value: 'Quarta', label: 'Quarta-feira' },
  ]

  it('renders group label correctly', () => {
    render(<TestFormWrapper options={mockOptions} />)
    expect(screen.getByText('Test Group')).toBeInTheDocument()
  })

  it('renders all checkbox options', () => {
    render(<TestFormWrapper options={mockOptions} />)

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument()
    })
  })

  it('renders checkboxes with correct types', () => {
    render(<TestFormWrapper options={mockOptions} />)

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(mockOptions.length)

    checkboxes.forEach((checkbox) => {
      expect(checkbox).toHaveAttribute('type', 'checkbox')
    })
  })

  it('displays error message when error is provided', () => {
    const error = { message: 'This field is required', type: 'required' }
    render(<TestFormWrapper options={mockOptions} error={error} />)

    expect(screen.getByText('This field is required')).toBeInTheDocument()
    expect(screen.getByText('This field is required')).toHaveClass(
      'text-red-500',
    )
  })

  it('does not display error message when no error', () => {
    render(<TestFormWrapper options={mockOptions} />)
    expect(screen.queryByText(/required/)).not.toBeInTheDocument()
  })

  it('checkboxes can be checked and unchecked', async () => {
    render(<TestFormWrapper options={mockOptions} />)

    const checkboxes = screen.getAllByRole('checkbox')
    const firstCheckbox = checkboxes[0] as HTMLInputElement

    expect(firstCheckbox.checked).toBe(false)

    await act(async () => {
      fireEvent.click(firstCheckbox)
    })
    expect(firstCheckbox.checked).toBe(true)

    await act(async () => {
      fireEvent.click(firstCheckbox)
    })
    expect(firstCheckbox.checked).toBe(false)
  })

  it('labels are associated with checkboxes correctly', () => {
    render(<TestFormWrapper options={mockOptions} />)

    const firstLabel = screen.getByText('Segunda-feira').closest('label')
    const checkboxes = screen.getAllByRole('checkbox')
    const firstCheckbox = checkboxes[0]

    expect(firstLabel).toContainElement(firstCheckbox)
  })

  it('applies hover styles correctly', () => {
    render(<TestFormWrapper options={mockOptions} />)

    const firstLabel = screen.getByText('Segunda-feira').closest('label')
    expect(firstLabel).toHaveClass('group')

    const firstSpan = screen.getByText('Segunda-feira')
    expect(firstSpan).toHaveClass('group-hover:text-purple-600')
  })

  it('renders with empty options array', () => {
    render(<TestFormWrapper options={[]} />)

    expect(screen.getByText('Test Group')).toBeInTheDocument()
    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  it('handles single option correctly', () => {
    const singleOption = [{ value: 'Segunda', label: 'Segunda-feira' }]
    render(<TestFormWrapper options={singleOption} />)

    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByText('Segunda-feira')).toBeInTheDocument()
  })

  it('should respect checkbox group accessibility', () => {
    render(<TestFormWrapper options={mockOptions} />)

    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeVisible()
      expect(checkbox).not.toBeDisabled()
    })
  })

  it('should handle error state properly', () => {
    const errorMessage = 'At least one day must be selected'
    const error = { message: errorMessage, type: 'required' }

    render(<TestFormWrapper options={mockOptions} error={error} />)

    const errorElement = screen.getByText(errorMessage)
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveClass('text-red-500', 'text-sm', 'mt-1')
  })

  it('should handle multiple selections correctly', async () => {
    render(<TestFormWrapper options={mockOptions} />)

    const checkboxes = screen.getAllByRole('checkbox')
    const firstCheckbox = checkboxes[0] as HTMLInputElement
    const secondCheckbox = checkboxes[1] as HTMLInputElement

    await act(async () => {
      fireEvent.click(firstCheckbox)
    })
    expect(firstCheckbox.checked).toBe(true)

    await act(async () => {
      fireEvent.click(secondCheckbox)
    })
    expect(firstCheckbox.checked).toBe(true)
    expect(secondCheckbox.checked).toBe(true)

    await act(async () => {
      fireEvent.click(firstCheckbox)
    })
    expect(firstCheckbox.checked).toBe(false)
    expect(secondCheckbox.checked).toBe(true)
  })
})
