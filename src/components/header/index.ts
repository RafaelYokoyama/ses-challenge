export * from './header.types'

import HeaderComponent from './header'
import HeaderWrapper from './header-wrapper'
import { HeaderTop } from './header-top'
import { HeaderNav } from './header-nav'
import { Logo } from './logo'
import { UserSection } from './user-section'

export const Header = {
  Root: HeaderWrapper,
  Top: HeaderTop,
  Nav: HeaderNav,
  Logo: Logo,
  UserSection: UserSection,
}


export { default as HeaderRoot, default } from './header'
export { HeaderTop, HeaderNav, Logo, UserSection } 