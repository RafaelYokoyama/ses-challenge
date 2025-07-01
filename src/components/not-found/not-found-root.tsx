'use client'

import { NotFoundRootProps } from './not-found.types'

export function NotFoundRoot({ children, className = '' }: NotFoundRootProps) {
  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-50 ${className}`}
    >
      <div className="w-full max-w-lg">
        <div className="relative p-8 text-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-purple-600/5" />
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-violet-200 to-purple-200 rounded-full opacity-20" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-indigo-200 to-violet-200 rounded-full opacity-20" />

          <div className="relative z-10 space-y-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
