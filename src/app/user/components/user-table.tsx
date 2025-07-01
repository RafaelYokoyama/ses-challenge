'use client'

import React, { useEffect } from 'react'
import Search from './ui/search'
import UserTable from './ui/table'
import { Pagination } from '@/components'
import { useUserTable } from '@/hooks/useUserTable'
import { UserDisplay } from '@/types'
import UserTableSkeleton from './user-table-skeleton'

export type UserType = UserDisplay

type UserTableProps = {
  initialUsers?: UserDisplay[]
}

export default function UserTableComponent({ initialUsers }: UserTableProps) {
  const {
    users: paginatedUsers,
    filteredUsers,
    loading,
    search,
    page,
    totalPages,
    handleSearch,
    handlePageChange,
    setPage,
    removeUser,
  } = useUserTable(initialUsers || [])

  if (loading) {
    return <UserTableSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="py-4 bg-white rounded-md">
        <Search search={search} setPage={setPage} setSearch={handleSearch} />

        <div className="overflow-x-scroll lg:overflow-x-auto">
          <UserTable
            paginatedUsers={paginatedUsers}
            onUserDeleted={removeUser}
          />
        </div>

        <Pagination.Root
          currentPage={page}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          onPageChange={handlePageChange}
        >
          <Pagination.Info />

          <Pagination.Controls>
            <Pagination.Button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              variant="previous"
              data-testid="prev-button"
            >
              Anterior
            </Pagination.Button>

            <Pagination.Pages />

            <Pagination.Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              variant="next"
              data-testid="next-button"
            >
              Próximo
            </Pagination.Button>
          </Pagination.Controls>

          <Pagination.PageSelect />
        </Pagination.Root>
      </div>
    </div>
  )
}
