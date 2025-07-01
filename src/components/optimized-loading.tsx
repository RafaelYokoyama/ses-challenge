'use client'

import { memo } from 'react'

interface OptimizedLoadingProps {
  variant?: 'table' | 'card' | 'inline' | 'button'
  size?: 'sm' | 'md' | 'lg'
  rows?: number
  className?: string
  text?: string
}

const OptimizedLoading = memo(
  ({
    variant = 'inline',
    size = 'md',
    rows = 5,
    className = '',
    text = 'Carregando...',
  }: OptimizedLoadingProps) => {
    const sizeClasses = {
      sm: 'h-3',
      md: 'h-4',
      lg: 'h-6',
    }

    if (variant === 'table') {
      return (
        <div className={`animate-pulse space-y-3 ${className}`}>
          {/* Header skeleton */}
          <div className="grid grid-cols-8 gap-4 bg-gray-100 p-4 rounded-md">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>

          {/* Rows skeleton */}
          {Array.from({ length: rows }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-8 gap-4 bg-white p-4 rounded-md border"
            >
              {Array.from({ length: 8 }).map((_, j) => (
                <div
                  key={j}
                  className={`${sizeClasses[size]} bg-gray-200 rounded`}
                  style={{
                    animationDelay: `${(i * 8 + j) * 50}ms`,
                  }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      )
    }

    if (variant === 'card') {
      return (
        <div className={`animate-pulse ${className}`}>
          <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      )
    }

    if (variant === 'button') {
      return (
        <div className={`animate-pulse ${className}`}>
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#7E50CE]"></div>
            <span className="text-sm text-gray-500">{text}</span>
          </div>
        </div>
      )
    }

    return (
      <div className={`animate-pulse flex items-center space-x-2 ${className}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#7E50CE]"></div>
        <div
          className={`${sizeClasses[size]} bg-gray-200 rounded flex-1 max-w-[200px]`}
        ></div>
      </div>
    )
  },
)

OptimizedLoading.displayName = 'OptimizedLoading'

export default OptimizedLoading

export function useOptimizedLoading() {
  return {
    TableSkeleton: () => <OptimizedLoading variant="table" rows={8} />,
    CardSkeleton: () => <OptimizedLoading variant="card" />,
    InlineSkeleton: () => <OptimizedLoading variant="inline" />,
    ButtonLoading: (text?: string) => (
      <OptimizedLoading variant="button" text={text} />
    ),
  }
}
