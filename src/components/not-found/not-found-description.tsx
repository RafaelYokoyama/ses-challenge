import { NotFoundDescriptionProps } from './not-found.types'

export function NotFoundDescription({
  children,
  className = '',
}: NotFoundDescriptionProps) {
  return (
    <p
      className={`text-lg text-slate-600 leading-relaxed max-w-md mx-auto ${className}`}
    >
      {children}
    </p>
  )
}
