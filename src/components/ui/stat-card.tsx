import { LucideIcon } from 'lucide-react'
import { Card } from './base-components'

interface StatCardProps {
  icon: LucideIcon
  value: string | number
  label: string
  description?: string
  color?: 'violet' | 'indigo' | 'slate' | 'purple'
  trend?: 'up' | 'down' | 'neutral'
}

const StatCard = ({
  icon: Icon,
  value,
  label,
  description,
  color = 'violet',
  trend = 'neutral',
}: StatCardProps) => {
  const colorGradients = {
    violet: 'from-violet-500 to-purple-600',
    indigo: 'from-indigo-500 to-violet-600',
    slate: 'from-slate-500 to-violet-600',
    purple: 'from-purple-500 to-violet-600',
  }

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-slate-600',
  }

  return (
    <Card variant="gradient" hover className="group">
      <div className="flex items-start gap-4">
        <div
          className={`
          w-14 h-14 bg-gradient-to-br ${colorGradients[color]} 
          rounded-lg flex items-center justify-center 
          group-hover:scale-110 transition-transform duration-300
        `}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-800 mb-1">{value}</h3>
          <p className="text-slate-600 font-medium">{label}</p>
          {description && (
            <p className={`text-sm mt-1 ${trendColors[trend]}`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}
export { StatCard, type StatCardProps }
