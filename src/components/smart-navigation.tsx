'use client'

import { useRouter } from 'next/navigation'
import { ComponentProps, MouseEvent, startTransition } from 'react'

interface SmartNavigationProps extends ComponentProps<'button'> {
  href: string
  replace?: boolean
  preventRSC?: boolean
}

export function SmartNavigation({
  href,
  replace = false,
  preventRSC = true,
  children,
  className = '',
  onClick,
  ...props
}: SmartNavigationProps) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    }

    if (e.defaultPrevented) return

    e.preventDefault()
    if (
      preventRSC &&
      (href.includes('/saved') ||
        href.includes('/friends') ||
        href.includes('/notifications') ||
        href.includes('/preferences'))
    ) {
      window.location.href = href
      return
    }

    startTransition(() => {
      if (replace) {
        router.replace(href)
      } else {
        router.push(href)
      }
    })
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

export default SmartNavigation
