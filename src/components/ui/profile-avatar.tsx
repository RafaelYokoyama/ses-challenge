interface ProfileAvatarProps {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  colors?: string[]
}

const ProfileAvatar = ({
  name,
  size = 'lg',
  colors = [
    'from-violet-600 to-purple-600',
    'from-indigo-600 to-violet-600',
    'from-purple-600 to-indigo-600',
    'from-slate-600 to-violet-600',
    'from-violet-600 to-slate-600',
  ],
}: ProfileAvatarProps) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-20 h-20 text-xl',
    lg: 'w-32 h-32 text-3xl',
    xl: 'w-40 h-40 text-4xl',
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  const colorIndex = name.charCodeAt(0) % colors.length
  const gradient = colors[colorIndex]

  return (
    <div
      className={`
      ${sizeClasses[size]} 
      rounded-full bg-gradient-to-br ${gradient} 
      flex items-center justify-center text-white font-bold 
      shadow-lg ring-4 ring-white/20
    `}
    >
      {initials}
    </div>
  )
}
export { ProfileAvatar }
