'use server'

import { ExternalHttpClient } from '@/lib/http-client'
import { API_CONFIG } from '@/infra/config/api'
import type { User } from '@/types'

interface GetUsersResponse {
  users: User[]
}

let usersCache: GetUsersResponse | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 30000

export const getUsers = async (): Promise<GetUsersResponse> => {
  try {
    const now = Date.now()
    
    if (usersCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return usersCache
    }
    
    const data = await ExternalHttpClient.get<{ users: User[] }>(API_CONFIG.EXTERNAL_ENDPOINTS.USERS)
    
    const response = {
      users: data?.users || data || [],
    }
    
    usersCache = response
    cacheTimestamp = now
    
    return response
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
