import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { buttonVariants } from './button.styles'

export interface ButtonProps 
  extends React.ComponentProps<'button'>, 
          VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: React.ReactNode
  'aria-label': string
}

export interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean
  loadingText?: string
} 