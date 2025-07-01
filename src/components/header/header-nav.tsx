'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { Breadcrumb } from '@/components/breadcrumb'
import BreadcrumbServer from '@/components/breadcrumb/breadcrumb-server'
import type { BreadcrumbItem } from '@/lib/breadcrumb-utils'
import { getUsers } from '@/http/get-users'
import { UserSection } from './user-section'
import { UserProfile } from './header.types'

interface HeaderNavProps {
  userProfile: UserProfile
}

const usersCache = new Map<string, string>()
const cacheTimestamp = new Map<string, number>()
const CACHE_DURATION = 30000

export const HeaderNav = ({ userProfile }: HeaderNavProps) => {
  const pathname = usePathname()
  const [userName, setUserName] = useState<string | null>(null)
  const isLoadingRef = useRef<string | null>(null)

  const isUserDetailPage = pathname.includes('/user/id/')
  const shouldShowDefaultBreadcrumb = !isUserDetailPage

  useEffect(() => {
    if (isUserDetailPage) {
      const userIdMatch = pathname.match(/\/user\/id\/(.+)/)
      if (userIdMatch) {
        const userId = userIdMatch[1]

        if (isLoadingRef.current === userId) {
          return
        }

        const cachedName = usersCache.get(userId)
        const cacheTime = cacheTimestamp.get(userId)
        const isValidCache =
          cacheTime && Date.now() - cacheTime < CACHE_DURATION

        if (cachedName && isValidCache) {
          setUserName(cachedName)
          return
        }

        isLoadingRef.current = userId
        fetchUserName(userId)
          .then((name) => {
            setUserName(name)
            usersCache.set(userId, name)
            cacheTimestamp.set(userId, Date.now())
            isLoadingRef.current = null
          })
          .catch(() => {
            isLoadingRef.current = null
          })
      }
    }
  }, [pathname, isUserDetailPage])

  const fetchUserName = async (userId: string): Promise<string> => {
    try {
      const allUsers = await getUsers()

      const currentUser = allUsers.users.find((user: any) => user.id === userId)

      if (currentUser) {
        return currentUser.name
      }

      return 'Usuário'
    } catch (error) {
      console.error('Erro ao buscar nome do usuário:', error)
      return 'Usuário'
    }
  }

  const userDetailBreadcrumb: BreadcrumbItem[] = [
    {
      href: '/user',
      label: 'Usuários',
      isActive: false,
    },
    {
      href: pathname,
      label: userName || 'Carregando...',
      isActive: true,
    },
  ]

  return (
    <nav
      className="flex items-center justify-between px-4 lg:px-8 h-[66px] border-b bg-white border-gray-300"
      aria-label="Navegação principal"
    >
      <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
        <Image
          src="/logo-sensedia.png"
          alt="Logo Sensedia"
          width={28}
          height={28}
          priority
          className="flex-shrink-0"
        />

        <h1 className="font-bold text-xs lg:text-sm text-[#8556AA] uppercase tracking-wide flex-shrink-0">
          Bem-vindo
        </h1>

        <div className="hidden sm:block min-w-0" suppressHydrationWarning>
          {isUserDetailPage ? (
            <BreadcrumbServer items={userDetailBreadcrumb} className="!my-0" />
          ) : shouldShowDefaultBreadcrumb ? (
            <Breadcrumb />
          ) : null}
        </div>
      </div>

      <UserSection userProfile={userProfile} />
    </nav>
  )
}
