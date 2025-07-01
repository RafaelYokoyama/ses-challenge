'use client'

import { CircleHelpIcon } from 'lucide-react'
import { IoAppsSharp } from 'react-icons/io5'

interface ToolbarIconsProps {
  onHelpClick?: () => void
  onAppsClick?: () => void
  className?: string
}

export const ToolbarIcons = ({
  onHelpClick,
  onAppsClick,
  className = 'flex items-center gap-2 lg:gap-5',
}: ToolbarIconsProps) => {
  return (
    <div className={className}>
      <button
        className="hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded p-1"
        onClick={onHelpClick}
        aria-label="Ajuda"
        type="button"
      >
        <CircleHelpIcon className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>

      <button
        className="hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded p-1"
        onClick={onAppsClick}
        aria-label="Aplicativos"
        type="button"
      >
        <IoAppsSharp className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>
    </div>
  )
}
