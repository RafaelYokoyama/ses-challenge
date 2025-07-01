import * as React from 'react'
import { Button } from './button'
import { IconButtonProps } from './button.types'

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'icon', ...props }, ref) => {
    return (
      <Button ref={ref} size={size} {...props}>
        {icon}
      </Button>
    )
  },
)

IconButton.displayName = 'IconButton'
