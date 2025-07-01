import { useState, useMemo, useCallback, useLayoutEffect, useRef } from 'react'
import { UserDisplay } from '@/types'
import { PERFORMANCE_CONFIG } from '@/lib/performance-config'

const ITEMS_PER_PAGE = PERFORMANCE_CONFIG.ITEMS_PER_PAGE
const SEARCH_DEBOUNCE_MS = PERFORMANCE_CONFIG.SEARCH_DEBOUNCE_MS

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useLayoutEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function useUserTable(initialUsers: UserDisplay[]) {
  const [users, setUsers] = useState<UserDisplay[]>([])
  const [loading, setLoading] = useState(true)
  const [optimisticUsers, setOptimisticUsers] = useState<UserDisplay[]>([])

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  
  const debouncedSearch = useDebounce(search, SEARCH_DEBOUNCE_MS)
  
  const searchCacheRef = useRef<Map<string, UserDisplay[]>>(new Map())

  useLayoutEffect(() => {
    setUsers(initialUsers)
    setOptimisticUsers(initialUsers)
    setLoading(false)
  }, [initialUsers])

  const filteredUsers = useMemo(() => {
    if (!debouncedSearch.trim()) return optimisticUsers
    
    const searchTerm = debouncedSearch.toLowerCase()
    
    if (searchCacheRef.current.has(searchTerm)) {
      return searchCacheRef.current.get(searchTerm)!
    }
    
    const filtered = optimisticUsers.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(searchTerm)
      const usernameMatch = user.username.toLowerCase().includes(searchTerm)
      const emailMatch = user.email.toLowerCase().includes(searchTerm)
      const cityMatch = user.city.toLowerCase().includes(searchTerm)
      
      return nameMatch || usernameMatch || emailMatch || cityMatch
    })
    
    searchCacheRef.current.set(searchTerm, filtered)
    
    return filtered
  }, [debouncedSearch, optimisticUsers])

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
    if (Math.abs(query.length - search.length) > 2) {
      searchCacheRef.current.clear()
    }
  }, [search])

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }, [totalPages])

  const removeUser = useCallback((userId: string) => {
    setOptimisticUsers(currentUsers => 
      currentUsers.filter(user => user.id !== userId)
    )
    
    setUsers(currentUsers => {
      const updatedUsers = currentUsers.filter(user => user.id !== userId)
      return updatedUsers
    })
    
    searchCacheRef.current.clear()
  }, [])

  const addUserOptimistic = useCallback((newUser: UserDisplay) => {
    setOptimisticUsers(currentUsers => [newUser, ...currentUsers])
    searchCacheRef.current.clear()
  }, [])

  const revertOptimisticUpdate = useCallback(() => {
    setOptimisticUsers(users)
    searchCacheRef.current.clear()
  }, [users])

  return {
    users: paginatedUsers,
    filteredUsers,
    allUsers: users,
    optimisticUsers,
    loading,
    search,
    debouncedSearch,
    page,
    totalPages,
    handleSearch,
    handlePageChange,
    setPage,
    removeUser,
    addUserOptimistic,
    revertOptimisticUpdate,
    totalUsers: users.length,
    isSearching: search !== debouncedSearch,
  }
} 