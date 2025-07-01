import NavigationButton from '@/components/navigation-button'
import { NotFoundActionProps } from './not-found.types'

export function NotFoundAction({
  href,
  icon: Icon,
  children,
  variant = 'secondary',
  className = '',
  onClick,
}: NotFoundActionProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-3 px-6 py-3 font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-none'

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white',
    secondary:
      'bg-gradient-to-r from-slate-600 to-violet-600 hover:from-slate-700 hover:to-violet-700 text-white',
  }

  return (
    <NavigationButton
      href={href}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </NavigationButton>
  )
}
