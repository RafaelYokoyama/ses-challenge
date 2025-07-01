'use client'

import { forwardRef } from 'react'
import {
  UseFormRegister,
  Control,
  useWatch,
  UseFormTrigger,
  UseFormClearErrors,
} from 'react-hook-form'
import { FormError, getErrorMessage } from '../form-types'
import { CreateUserFormData } from '@/types'

interface CheckboxOption {
  value: string
  label: string
}

interface CheckboxGroupProps {
  label: string
  options: CheckboxOption[]
  error?: FormError
  name: keyof CreateUserFormData
  register: UseFormRegister<CreateUserFormData>
  control: Control<CreateUserFormData>
  setValue: (name: keyof CreateUserFormData, value: DayOfWeek[]) => void
  trigger?: UseFormTrigger<CreateUserFormData>
  clearErrors?: UseFormClearErrors<CreateUserFormData>
}

type DayOfWeek =
  | 'Segunda'
  | 'Terça'
  | 'Quarta'
  | 'Quinta'
  | 'Sexta'
  | 'Sábado'
  | 'Domingo'

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ label, options, error, name, control, setValue, trigger }, ref) => {
    const watchedValues = useWatch({
      control,
      name,
      defaultValue: [],
    }) as DayOfWeek[]

    const currentValues = Array.isArray(watchedValues) ? watchedValues : []

    const handleChange = async (optionValue: string, checked: boolean) => {
      const dayValue = optionValue as DayOfWeek
      let newValues: DayOfWeek[]

      if (checked) {
        if (!currentValues.includes(dayValue)) {
          newValues = [...currentValues, dayValue]
        } else {
          newValues = currentValues
        }
      } else {
        newValues = currentValues.filter((val: DayOfWeek) => val !== dayValue)
      }

      setValue(name, newValues)

      if (trigger) {
        await trigger(name)
      }
    }

    return (
      <div ref={ref} className="space-y-4">
        <label className="block text-sm font-medium text-gray-600">
          {label}
        </label>
        <div className="flex flex-wrap gap-4">
          {options.map(({ value: optionValue, label: optionLabel }) => {
            const isChecked = currentValues.includes(optionValue as DayOfWeek)

            return (
              <label
                key={optionValue}
                className="flex items-center gap-2 cursor-pointer text-sm font-medium group"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => handleChange(optionValue, e.target.checked)}
                  className="
                    accent-[#7E50CE] w-5 h-5 rounded 
                    transition-all duration-200
                    group-hover:scale-110
                    focus:ring-2 focus:ring-purple-300 focus:ring-offset-1
                  "
                />
                <span className="text-gray-700 transition-colors group-hover:text-purple-600">
                  {optionLabel}
                </span>
              </label>
            )
          })}
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-1">{getErrorMessage(error)}</p>
        )}
      </div>
    )
  },
)

CheckboxGroup.displayName = 'CheckboxGroup'

export default CheckboxGroup
