import { ReactNode } from 'react'

type LayoutType = 'single' | 'two-columns' | 'three-columns'

interface ProfileLayoutProps {
  children: ReactNode
}

interface SectionProps {
  children: ReactNode
  layout?: LayoutType
}

interface ContactInfoProps {
  email: string
  city: string
}

interface UserInfoGridProps {
  children: ReactNode
  spacing?: 'sm' | 'md' | 'lg'
}

interface DaysGridProps {
  days: string[]
  columns?: 2 | 3 | 4
}

interface HeaderProps {
  children: ReactNode
  variant?: 'simple' | 'detailed'
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return <div className="max-w-6xl mx-auto">{children}</div>
}

const Header = ({ children, variant = 'detailed' }: HeaderProps) => (
  <section
    className="mb-8 relative overflow-hidden rounded-xl"
    data-variant={variant}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-purple-600/5" />
    <div className="relative z-10 p-6 md:p-8">{children}</div>
  </section>
)

const Section = ({ children, layout = 'single' }: SectionProps) => {
  const getGridClass = () => {
    switch (layout) {
      case 'two-columns':
        return 'grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8'
      case 'three-columns':
        return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6'
      default:
        return ''
    }
  }

  return (
    <section className="mb-8" data-layout={layout}>
      <div className={getGridClass()}>{children}</div>
    </section>
  )
}

const Content = ({ children, layout = 'single' }: SectionProps) => {
  const getGridClass = () => {
    switch (layout) {
      case 'two-columns':
        return 'grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8'
      case 'three-columns':
        return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6'
      default:
        return ''
    }
  }

  return <div className={getGridClass()}>{children}</div>
}

const ContactInfo = ({ email, city }: ContactInfoProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 justify-center md:justify-start">
        <span className="text-violet-600 font-medium">E-mail:</span>
        <span className="text-slate-700">{email}</span>
      </div>
      <div className="flex items-center gap-3 justify-center md:justify-start">
        <span className="text-violet-600 font-medium">Cidade:</span>
        <span className="text-slate-700">{city}</span>
      </div>
    </div>
  )
}

const UserInfoGrid = ({ children, spacing = 'md' }: UserInfoGridProps) => {
  const spacingMap = {
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
  }
  return <div className={spacingMap[spacing]}>{children}</div>
}

const DaysGrid = ({ days, columns = 2 }: DaysGridProps) => {
  const gridClass =
    columns === 3
      ? 'grid grid-cols-2 md:grid-cols-3 gap-2'
      : columns === 4
        ? 'grid grid-cols-2 md:grid-cols-4 gap-2'
        : 'grid grid-cols-2 md:grid-cols-2 gap-2'

  return (
    <div className={gridClass}>
      {days.map((day) => (
        <div
          key={day}
          className="px-3 py-2 bg-white/70 rounded-lg text-center text-slate-700 font-medium border border-violet-100"
        >
          {day}
        </div>
      ))}
    </div>
  )
}

ProfileLayout.Header = Header
ProfileLayout.Section = Section
ProfileLayout.Content = Content
ProfileLayout.ContactInfo = ContactInfo

export { ProfileLayout, ContactInfo, UserInfoGrid, DaysGrid }

export interface SectionHeaderProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle?: string
}

export const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
}: SectionHeaderProps) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
        {subtitle && <p className="text-slate-600 text-sm mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}

export interface DaysDisplayProps {
  days: string
}

export const DaysDisplay = ({ days }: DaysDisplayProps) => {
  return (
    <div
      className="px-3 py-2 bg-white/70 rounded-lg text-center text-slate-700 font-medium border border-violet-100"
      title={`Disponível: ${days}`}
    >
      {days}
    </div>
  )
}
