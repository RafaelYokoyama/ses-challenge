import { FieldError, FieldErrors, FieldErrorsImpl, Merge } from 'react-hook-form'

export type FormError = 
  | FieldError 
  | FieldErrors 
  | Merge<FieldError, FieldErrorsImpl<Record<string, unknown>>>
  | Merge<FieldError, (FieldError | undefined)[]>
  | Record<string, unknown>
  | undefined

export const getErrorMessage = (error: FormError): string => {
  if (!error) return ''
  
  try {
    if (typeof error === 'object' && error !== null) {
      if ('message' in error && error.message) {
        const message = error.message
        if (typeof message === 'string') {
          return message
        }
        return String(message)
      }
      
      if ('type' in error) {
        return 'Campo obrigatório'
      }
    }
    
    if (typeof error === 'string') {
      return error
    }
    
  } catch {
    return 'Campo obrigatório'
  }
  
  return 'Campo obrigatório'
} 