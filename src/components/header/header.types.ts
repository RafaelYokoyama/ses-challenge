export interface UserProfile {
  name: string
  menu: Array<{
    label: string
    route: string
  }>
}

export interface HeaderProps {
  userProfile?: UserProfile
}

export interface LogoProps {
  size?: 'sm' | 'lg'
  href?: string
}

export interface UserSectionProps {
  userProfile: UserProfile
} 