import { useState, useMemo, useCallback, useLayoutEffect } from 'react'
import { UserDisplay } from '@/types'


const ITEMS_PER_PAGE = 8

export function useUserTable(initialUsers: UserDisplay[]) {
  const [users, setUsers] = useState<UserDisplay[]>([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

 
  useLayoutEffect(() => {
    setUsers(initialUsers)
    setLoading(false)
 
  }, [initialUsers])


  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users
    
    const searchTerm = search.toLowerCase()
    
    return users.filter(user => {

      const nameMatch = user.name.toLowerCase().includes(searchTerm)
      const usernameMatch = user.username.toLowerCase().includes(searchTerm)
      
      return nameMatch || usernameMatch
    })
  }, [search, users])

  const totalPages = useMemo(() => {
    return Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
  }, [filteredUsers.length])

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredUsers, page])

  const handleSearch = useCallback((query: string) => {
    setSearch(query)
    setPage(1)
  }, [])

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }, [totalPages])

  const removeUser = useCallback((userId: string) => {
    setUsers(currentUsers => {
      const updatedUsers = currentUsers.filter(user => user.id !== userId)

      return updatedUsers
    })
  }, [])

  return {
    users: paginatedUsers,
    filteredUsers,
    allUsers: users, 
    loading,
    search,
    page,
    totalPages,
    handleSearch,
    handlePageChange,
    setPage,
    removeUser,
    totalUsers: users.length,
  }
} 