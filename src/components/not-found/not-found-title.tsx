import { NotFoundTitleProps } from './not-found.types'

export function NotFoundTitle({
  children,
  className = '',
}: NotFoundTitleProps) {
  return (
    <h1
      className={`text-3xl font-bold text-slate-800 leading-tight ${className}`}
    >
      {children}
    </h1>
  )
}
