import { NotFoundIconProps } from './not-found.types'

export function NotFoundIcon({ children, className = '' }: NotFoundIconProps) {
  return (
    <div
      className={`w-24 h-24 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg ${className}`}
    >
      {children}
    </div>
  )
}
