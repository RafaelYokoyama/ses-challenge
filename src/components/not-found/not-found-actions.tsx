import { NotFoundActionsProps } from './not-found.types'

export function NotFoundActions({
  children,
  className = '',
}: NotFoundActionsProps) {
  return (
    <div className={`space-y-3 pt-4 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
    </div>
  )
}
