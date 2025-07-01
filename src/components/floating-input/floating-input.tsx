'use client'

import { forwardRef, useState } from 'react'
import { FormError, getErrorMessage } from '../form-types'

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: FormError
  required?: boolean
}

const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, required = false, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const handleFocus = () => setIsFocused(true)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(e.target.value.length > 0)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }

    const isLabelFloated = isFocused || hasValue

    return (
      <div className="relative">
        <input
          ref={ref}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className={`
            w-full border-b-2 bg-gray-100 pt-6 pb-2 px-5 text-sm 
            transition-all duration-200 focus:outline-none
            ${error ? 'border-red-500' : 'border-[#9E9E9E] focus:border-purple-600'}
            ${props.className || ''}
          `}
        />
        <label
          className={`
            absolute left-5 transition-all duration-200 pointer-events-none
            ${
              isLabelFloated
                ? 'top-1 text-xs text-gray-500'
                : 'top-6 text-sm text-gray-400'
            }
            ${error ? 'text-red-500' : ''}
          `}
        >
          {label} {required && '*'}
        </label>
        {error && (
          <p className="text-red-500 text-sm mt-1">{getErrorMessage(error)}</p>
        )}
      </div>
    )
  },
)

FloatingInput.displayName = 'FloatingInput'

export default FloatingInput
