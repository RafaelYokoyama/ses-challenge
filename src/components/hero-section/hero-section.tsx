import { ReactNode } from 'react'

interface HeroSectionProps {
  children: ReactNode
  className?: string
}

interface HeroItemProps {
  icon: ReactNode
  title: string
  subtitle: string
}

const HeroSection = ({ children, className = '' }: HeroSectionProps) => {
  return (
    <section className={`bg-[#8556AA] lg:h-[100px] h-20 ${className}`}>
      <div className="max-w-[1300px] mx-auto text-white h-full flex items-center lg:gap-12 gap-4 px-3 lg:px-8">
        {children}
      </div>
    </section>
  )
}

const HeroItem = ({ icon, title, subtitle }: HeroItemProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="bg-white px-1 py-[6px] rounded-sm text-[#8556AA] lg:size-9 size-5 flex items-center justify-center">
        {icon}
      </span>
      <div className="flex flex-col gap-2">
        <p className="lg:text-sm text-[9px] font-semibold">{title}</p>
        <p className="lg:text-sm text-xs font-extralight">{subtitle}</p>
      </div>
    </div>
  )
}

const HeroIcon = ({ icon, title, subtitle }: HeroItemProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-white">{icon}</span>
      <div className="flex flex-col gap-2">
        <p className="lg:text-sm text-[9px] font-semibold">{title}</p>
        <p className="lg:text-sm text-[9px] font-extralight">{subtitle}</p>
      </div>
    </div>
  )
}

HeroSection.Item = HeroItem
HeroSection.Icon = HeroIcon

export default HeroSection
