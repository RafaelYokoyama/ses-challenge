import * as React from 'react'
import { Button } from './button'
import { LoadingButtonProps } from './button.types'

export const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  LoadingButtonProps
>(({ isLoading = false, loadingText, children, disabled, ...props }, ref) => {
  return (
    <Button ref={ref} disabled={disabled || isLoading} {...props}>
      {isLoading && <span className="animate-spin">🔄</span>}
      {isLoading ? loadingText || 'Carregando...' : children}
    </Button>
  )
})

LoadingButton.displayName = 'LoadingButton'
