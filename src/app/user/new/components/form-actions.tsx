'use client'

import { LoaderCircleIcon } from 'lucide-react'

interface FormActionsProps {
  isSubmitting: boolean
  onCancel: () => void
  submitText?: string
  cancelText?: string
}

const FormActions = ({
  isSubmitting,
  onCancel,
  submitText = 'REGISTRAR',
  cancelText = 'CANCELAR',
}: FormActionsProps) => {
  return (
    <div className="flex items-center gap-4 mt-8 lg:mt-20">
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          bg-purple-600 flex items-center gap-2 cursor-pointer 
          lg:text-base text-sm text-white font-semibold 
          px-6 py-2 rounded-full 
          transition-all duration-200
          hover:bg-purple-700 hover:scale-105
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          focus:ring-2 focus:ring-purple-300 focus:ring-offset-2
        "
      >
        {isSubmitting ? (
          <>
            <LoaderCircleIcon className="animate-spin size-4" />
            Enviando
          </>
        ) : (
          submitText
        )}
      </button>

      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="
          text-purple-700 font-semibold lg:text-base text-sm 
          px-6 py-2 rounded-full cursor-pointer
          transition-all duration-200
          hover:bg-gray-200 hover:scale-105
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          focus:ring-2 focus:ring-gray-300 focus:ring-offset-2
        "
      >
        {cancelText}
      </button>
    </div>
  )
}
export default FormActions
