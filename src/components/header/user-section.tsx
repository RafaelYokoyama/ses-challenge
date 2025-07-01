'use client'

import { UserDropdown } from '@/components/user-dropdown'
import { ToolbarIcons } from '@/components/toolbar'
import { Avatar } from '@/components/ui/avatar'
import { UserSectionProps } from './header.types'
import { ChevronDown } from 'lucide-react'

export const UserSection = ({ userProfile }: UserSectionProps) => {
  return (
    <div className="flex items-center gap-2 lg:gap-4">
      <ToolbarIcons className="flex items-center gap-2 lg:gap-5" />

      <div className="ml-2 lg:ml-6 mr-1 w-[1px] lg:w-[2px] h-[30px] lg:h-[40px] bg-[#E2E2E2]" />

      <UserDropdown options={userProfile.menu}>
        <div className="flex items-center gap-1 lg:gap-3 cursor-pointer hover:opacity-90 transition-opacity">
          <Avatar
            name={userProfile.name}
            size="sm"
            className="bg-[#8556aa] w-8 h-8 lg:w-10 lg:h-10"
          />
          <div className="hidden sm:flex flex-col">
            <p className="text-xs lg:text-sm font-medium line-clamp-1">
              {userProfile.name}
            </p>
          </div>
          <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-gray-500 flex-shrink-0" />
        </div>
      </UserDropdown>
    </div>
  )
}
