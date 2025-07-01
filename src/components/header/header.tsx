'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { HeaderTop } from './header-top'
import { HeaderNav } from './header-nav'
import { HeaderProps } from './header.types'

import { Breadcrumb } from '@/components/breadcrumb'
import BreadcrumbServer from '@/components/breadcrumb/breadcrumb-server'

import { getUsers } from '@/http/get-users'
import type { BreadcrumbItem } from '@/lib/breadcrumb-utils'
import type { User } from '@/types'
import { extractUserIdFromPath } from '@/lib/utils'

const Header = ({ userProfile }: HeaderProps = {}) => {
  const pathname = usePathname()
  const [userName, setUserName] = useState<string | null>(null)

  const userId = extractUserIdFromPath(pathname)
  const isUserDetailPage = Boolean(userId)

  const fetchUserNameById = async (userId: string): Promise<string> => {
    try {
      const allUsers = await getUsers()
      const found = allUsers.users.find((user: User) => user.id === userId)
      return found?.name ?? 'Usuário'
    } catch {
      return 'Usuário'
    }
  }

  useEffect(() => {
    if (!userId) return
    fetchUserNameById(userId).then(setUserName)
  }, [userId])

  const breadcrumbs: BreadcrumbItem[] =
    isUserDetailPage && userName
      ? [
          { href: '/user', label: 'Usuários', isActive: false },
          { href: pathname, label: userName, isActive: true },
        ]
      : []

  const profile = userProfile ?? { name: 'Usuário', menu: [] }

  return (
    <header className="sticky top-0 z-50">
      <HeaderTop />
      <HeaderNav userProfile={profile} />
      <div className="sm:hidden bg-gray-50 border-b border-gray-200 px-4 py-2">
        {breadcrumbs.length > 0 ? (
          <BreadcrumbServer items={breadcrumbs} className="!my-0" />
        ) : (
          <Breadcrumb className="!my-0" />
        )}
      </div>
    </header>
  )
}

export default Header
