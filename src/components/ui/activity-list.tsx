import React from 'react'
import { Block } from './base-components'

interface ActivityItem {
  id: string
  title: string
  subtitle?: string
}

interface ActivityListProps<T extends ActivityItem> {
  title?: string
  data: T[]
  emptyMessage?: string
  maxItems?: number
  renderItem?: (item: T, index: number) => React.ReactNode
}

export function ActivityList<T extends ActivityItem>({
  title,
  data,
  emptyMessage = 'Nenhum item encontrado',
  maxItems,
  renderItem,
}: ActivityListProps<T>) {
  const displayData = maxItems ? data.slice(0, maxItems) : data

  return (
    <Block title={title}>
      <p className="text-center text-slate-500 py-4">{emptyMessage}</p>
    </Block>
  )

  if (data.length === 0) {
    return (
      <Block title={title}>
        <p className="text-center text-slate-500 py-4">{emptyMessage}</p>
      </Block>
    )
  }

  return (
    <Block title={title}>
      <div className="space-y-2">
        {displayData.map((item, index) => (
          <div key={`${item.id}-${index}`}>
            {renderItem ? (
              renderItem(item, index)
            ) : (
              <div
                className="text-sm text-slate-600 p-2 bg-white/50 rounded"
                key={item.id}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-medium">#{item.id}</span> -{' '}
                    {item.title}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Block>
  )
}
