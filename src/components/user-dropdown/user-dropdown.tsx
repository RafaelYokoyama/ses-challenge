'use client'

import { useEffect, useRef, useState } from 'react'
import { UserDropdownLegacyProps } from './user-dropdown.types'

interface UserDropDownProps {
  children: React.ReactNode
  options: { label: string; route: string }[]
}

const UserDropdown: React.FC<UserDropDownProps> = ({ children, options }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const dropDownRef = useRef<HTMLDivElement>(null)

  const toggleDropDown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: { label: string; route: string }) => {
    if (
      option.route === 'saved' ||
      option.route === 'friends' ||
      option.route === 'notifications' ||
      option.route === 'preferences' ||
      option.route === 'logout'
    ) {
      window.location.href = `/${option.route}`
      setIsOpen(false)
      return
    }

    import('react').then(({ startTransition }) => {
      startTransition(() => {
        import('next/navigation').then(({ useRouter }) => {
          window.location.href = `/${option.route}`
        })
      })
    })
    setIsOpen(false)
  }

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropDownRef}>
      <button
        onClick={toggleDropDown}
        className="cursor-pointer focus:outline-offset-2 py-[2px] px-2 focus:ring-4 focus:ring-gray-200 rounded-md transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {children}
      </button>

      <div
        className={`absolute right-0 mt-2 w-52 rounded-md shadow-lg focus:outline-none z-10 overflow-hidden bg-neutral-900 text-white transition-all duration-200 origin-top-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-[10px] pointer-events-none'
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu"
      >
        {hoverIndex !== null && (
          <div
            className="absolute left-0 h-9 w-1 z-50 bg-purple-500 transition-all duration-200"
            style={{
              top: `${hoverIndex * 36}px`,
            }}
            data-testid="hover-indicator"
          />
        )}

        {options.map((item, index) => (
          <div
            key={index}
            className="w-full text-left px-4 py-2 text-sm cursor-pointer hover:bg-neutral-800 relative z-10"
            role="menuitem"
            onClick={() => handleOptionClick(item)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
const UserDropdownLegacy = ({ children, options }: UserDropdownLegacyProps) => {
  return <UserDropdown options={options}>{children}</UserDropdown>
}

const UserDropdownWithLegacy = Object.assign(UserDropdown, {
  Legacy: UserDropdownLegacy,
})

export default UserDropdownWithLegacy
export { UserDropdownLegacy }
