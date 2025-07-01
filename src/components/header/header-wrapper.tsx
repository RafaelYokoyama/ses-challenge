import { getUserProfile } from '@/http/get-user-profile'
import Header from './header'

const HeaderWrapper = async () => {
  const userProfile = await getUserProfile()

  return <Header userProfile={userProfile} />
}

export default HeaderWrapper
