'use client'

import { ComponentProps, MouseEvent } from 'react'

interface NavigationButtonProps extends ComponentProps<'button'> {
  href: string
  replace?: boolean
  forceWindowLocation?: boolean
}

export function NavigationButton({
  href,
  replace = false,
  forceWindowLocation = false,
  children,
  className = '',
  onClick,
  ...props
}: NavigationButtonProps) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    }

    if (e.defaultPrevented) return

    e.preventDefault()

    if (
      forceWindowLocation ||
      href.includes('/saved') ||
      href.includes('/friends') ||
      href.includes('/notifications') ||
      href.includes('/preferences')
    ) {
      if (replace) {
        window.location.replace(href)
      } else {
        window.location.href = href
      }
      return
    }

    if (replace) {
      window.location.replace(href)
    } else {
      window.location.href = href
    }
  }

  return (
    <button
      {...props}
      className={`cursor-pointer ${className}`}
      onClick={handleClick}
      type="button"
    >
      {children}
    </button>
  )
}

export default NavigationButton
