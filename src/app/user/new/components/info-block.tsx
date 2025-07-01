import type { ReactNode } from 'react'

interface InfoBlockProps {
  icon: ReactNode
  title: string
  description: string
}

export default function InfoBlock({
  icon,
  title,
  description,
}: InfoBlockProps) {
  return (
    <div className="flex flex-col">
      <h3 className="lg:text-lg text-sm font-medium text-[#8556AA] mb-2">
        {title}
      </h3>
      <div className="flex items-center gap-4">
        <div className="rounded-full flex items-center justify-center lg:text-base text-sm text-[#8556AA] mr-4 flex-shrink-0">
          {icon}
        </div>
        <p className="text-gray-600 lg:text-base text-xs">{description}</p>
      </div>
    </div>
  )
}
