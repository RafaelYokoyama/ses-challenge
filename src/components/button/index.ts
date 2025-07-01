
export * from './button.types'

export { buttonVariants } from './button.styles'

import { Button as ButtonBase } from './button'
import { IconButton } from './icon-button'
import { LoadingButton } from './loading-button'

export const Button = {
  Root: ButtonBase,
  Icon: IconButton,
  Loading: LoadingButton,
}

export { Button as ButtonRoot, IconButton, LoadingButton } 