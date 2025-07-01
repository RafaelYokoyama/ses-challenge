'use client'

import Link from 'next/link'
import { ComponentProps } from 'react'

interface OptimizedLinkProps extends ComponentProps<typeof Link> {
  preventRSC?: boolean
}

export function OptimizedLink({
  prefetch = false,
  preventRSC = true,
  onClick,
  ...props
}: OptimizedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (preventRSC) {
      const href = props.href?.toString() || ''
      if (
        href.includes('/saved') ||
        href.includes('/friends') ||
        href.includes('/notifications') ||
        href.includes('/preferences')
      ) {
        e.preventDefault()
        window.location.href = href
        return
      }
    }

    onClick?.(e)
  }

  return <Link {...props} prefetch={prefetch} onClick={handleClick} />
}

export default OptimizedLink
