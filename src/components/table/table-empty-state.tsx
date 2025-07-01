'use client'

import * as React from 'react'
import { TableEmptyStateProps } from './table.types'

export const TableEmptyState = ({
  colSpan,
  icon = '👥',
  title = 'Nenhum item encontrado',
  description = 'Tente ajustar os filtros de pesquisa ou adicione novos itens',
}: TableEmptyStateProps) => {
  return (
    <tr>
      <td colSpan={colSpan} className="py-12 text-center text-gray-500">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="text-4xl">{icon}</div>
          <div className="text-lg font-medium">{title}</div>
          <div className="text-sm text-gray-400">{description}</div>
        </div>
      </td>
    </tr>
  )
}

TableEmptyState.displayName = 'TableEmptyState'
