'use client'

import { cn } from '@/lib/utils'

interface AvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  colors?: string[]
  className?: string
}

const Avatar = ({
  name,
  size = 'lg',
  className,
  colors = [
    'from-violet-600 to-purple-600',
    'from-indigo-600 to-violet-600',
    'from-purple-600 to-indigo-600',
    'from-slate-600 to-violet-600',
    'from-violet-600 to-slate-600',
  ],
}: AvatarProps) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-20 h-20 text-xl',
    lg: 'w-32 h-32 text-3xl',
    xl: 'w-40 h-40 text-4xl',
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const colorIndex = name.charCodeAt(0) % colors.length
  const gradient = `bg-gradient-to-br ${colors[colorIndex]}`

  return (
    <div
      className={cn(
        sizeClasses[size],
        'rounded-full flex items-center justify-center text-white font-bold shadow-lg ring-4 ring-white/20',
        gradient,
        className,
      )}
    >
      {initials}
    </div>
  )
}

export { Avatar }
