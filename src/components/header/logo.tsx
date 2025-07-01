import Image from 'next/image'
import SmartNavigation from '@/components/smart-navigation'
import { LogoProps } from './header.types'

export const Logo = ({ href = '/' }: Omit<LogoProps, 'size'>) => {
  return (
    <SmartNavigation
      href={href}
      preventRSC={false}
      className="hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#3D3D3D] rounded bg-transparent border-none p-0"
      aria-label="Ir para página inicial"
    >
      <Image
        src="/logo.png"
        alt="Logo da empresa"
        width={130}
        height={130}
        priority
        className="w-[60px] h-[60px] lg:w-[130px] lg:h-[130px] object-contain"
      />
    </SmartNavigation>
  )
}
