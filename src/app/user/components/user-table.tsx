'use client'

import React, { memo } from 'react'
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

function UserTableComponent({ initialUsers }: UserTableProps) {
  const {
    users: paginatedUsers,
    filteredUsers,
    loading,
    search,
    debouncedSearch,
    page,
    totalPages,
    handleSearch,
    handlePageChange,
    setPage,
    removeUser,
    isSearching,
  } = useUserTable(initialUsers || [])

  if (loading) {
    return <UserTableSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="py-4 bg-white rounded-md">
        <Search
          search={search}
          setPage={setPage}
          setSearch={handleSearch}
          isSearching={isSearching}
        />

        <div className="overflow-x-scroll lg:overflow-x-auto">
          <UserTable
            paginatedUsers={paginatedUsers}
            onUserDeleted={removeUser}
          />
        </div>

        {search.trim() && !isSearching && (
          <div className="px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-md mt-2">
            {filteredUsers.length === 0
              ? `Nenhum resultado encontrado para "${debouncedSearch}"`
              : `${filteredUsers.length} resultado${filteredUsers.length !== 1 ? 's' : ''} para "${debouncedSearch}"`}
          </div>
        )}

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

export default memo(UserTableComponent)
