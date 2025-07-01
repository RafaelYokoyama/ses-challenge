'use client'

import { createContext, useContext } from 'react'
import { PaginationContextValue } from './pagination.types'

const PaginationContext = createContext<PaginationContextValue | null>(null)

export const usePaginationContext = () => {
  const context = useContext(PaginationContext)
  if (!context) {
    throw new Error(
      'Pagination components must be used within a Pagination.Root',
    )
  }
  return context
}

export { PaginationContext }
