import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface CardContextValue {
  variant: 'default' | 'gradient' | 'glass'
  size: 'sm' | 'md' | 'lg'
}

interface CardProps {
  children: ReactNode
  className?: string
  variant?: CardContextValue['variant']
  size?: CardContextValue['size']
  hover?: boolean
}

const Card = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  hover = false,
}: CardProps) => {
  const baseClasses =
    'backdrop-blur-sm rounded-xl shadow-lg border border-white/20'

  const variantClasses = {
    default: 'bg-white/80',
    gradient: 'bg-gradient-to-br from-white/90 to-white/60',
    glass: 'bg-white/40',
  }

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  const hoverClasses = hover
    ? 'hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer'
    : 'transition-all duration-200'

  return (
    <div
      className={`
      ${baseClasses} 
      ${variantClasses[variant]} 
      ${sizeClasses[size]} 
      ${hoverClasses} 
      ${className}
    `}
    >
      {children}
    </div>
  )
}

interface SectionHeaderProps {
  icon?: LucideIcon
  title: string
  subtitle?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'violet' | 'indigo' | 'slate'
}

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  className = '',
  size = 'md',
  color = 'violet',
}: SectionHeaderProps) => {
  const sizeClasses = {
    sm: 'text-lg mb-3',
    md: 'text-2xl mb-6',
    lg: 'text-3xl mb-8',
  }

  const colorClasses = {
    violet: 'text-violet-600',
    indigo: 'text-indigo-600',
    slate: 'text-slate-600',
  }

  return (
    <div className={`${className}`}>
      <h2
        className={`font-bold text-slate-800 flex items-center gap-3 ${sizeClasses[size]}`}
      >
        {Icon && <Icon className={`w-6 h-6 ${colorClasses[color]}`} />}
        {title}
      </h2>
      {subtitle && <p className="text-slate-600 -mt-2 mb-4">{subtitle}</p>}
    </div>
  )
}

interface BlockProps {
  title?: string
  children: ReactNode
  variant?: 'default' | 'highlighted' | 'subtle'
  padding?: 'sm' | 'md' | 'lg'
}

const Block = ({
  title,
  children,
  variant = 'default',
  padding = 'md',
}: BlockProps) => {
  const variants = {
    default: 'bg-gradient-to-r from-violet-50 to-purple-50 border-violet-100',
    highlighted:
      'bg-gradient-to-r from-violet-100 to-purple-100 border-violet-200',
    subtle: 'bg-gradient-to-r from-slate-50 to-violet-50 border-slate-100',
  }

  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  return (
    <div
      className={`${paddingClasses[padding]} bg-gradient-to-r ${variants[variant]} rounded-lg border`}
    >
      {title && <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>}
      <div className="text-slate-600">{children}</div>
    </div>
  )
}

interface GridProps {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg'
  responsive?: boolean
  className?: string
}

const Grid = ({
  children,
  cols = 2,
  gap = 'md',
  responsive = true,
  className = '',
}: GridProps) => {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  }

  const colClasses = responsive
    ? `grid-cols-1 lg:grid-cols-${cols}`
    : `grid-cols-${cols}`

  return (
    <div className={`grid ${colClasses} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}

interface SectionProps {
  children: ReactNode
  spacing?: 'sm' | 'md' | 'lg'
  className?: string
}

const Section = ({
  children,
  spacing = 'md',
  className = '',
}: SectionProps) => {
  const spacingClasses = {
    sm: 'mb-4',
    md: 'mb-8',
    lg: 'mb-12',
  }

  return (
    <section className={`${spacingClasses[spacing]} ${className}`}>
      {children}
    </section>
  )
}

export { Card, SectionHeader, Block, Grid, Section, type GridProps }
