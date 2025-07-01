'use client'

import { useRouter } from 'next/navigation'
import { ComponentProps, MouseEvent, startTransition, useEffect } from 'react'
import { AVOID_RSC_ROUTES } from '@/lib/performance-config'

interface SmartNavigationProps extends ComponentProps<'button'> {
  href: string
  replace?: boolean
  preventRSC?: boolean
  prefetch?: boolean
  optimistic?: boolean
}

export function SmartNavigation({
  href,
  replace = false,
  preventRSC = true,
  prefetch = true,
  optimistic = false,
  children,
  className = '',
  onClick,
  ...props
}: SmartNavigationProps) {
  const router = useRouter()

  useEffect(() => {
    if (prefetch && !preventRSC) {
      router.prefetch(href)
    }
  }, [href, prefetch, preventRSC, router])

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e)
    }

    if (e.defaultPrevented) return

    e.preventDefault()

    if (preventRSC && AVOID_RSC_ROUTES.some((route) => href.includes(route))) {
      window.location.href = href
      return
    }

    if (optimistic) {
      if (replace) {
        router.replace(href)
      } else {
        router.push(href)
      }
    } else {
      startTransition(() => {
        if (replace) {
          router.replace(href)
        } else {
          router.push(href)
        }
      })
    }
  }

  const handleMouseEnter = () => {
    if (!preventRSC && prefetch) {
      router.prefetch(href)
    }
  }

  return (
    <button
      {...props}
      className={`cursor-pointer transition-all duration-200 ${className}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      type="button"
    >
      {children}
    </button>
  )
}

export default SmartNavigation
