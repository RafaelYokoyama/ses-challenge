'use server'

import { ExternalHttpClient } from '@/lib/http-client'
import { API_CONFIG } from '@/infra/config/api'
import type { User } from '@/types'

interface GetUserByIdResponse {
  user: User
}

const userCache = new Map<string, { data: GetUserByIdResponse; timestamp: number }>()
const CACHE_DURATION = 30000

export async function getUserById(id: string): Promise<GetUserByIdResponse> {
  const cached = userCache.get(id)
  const now = Date.now()
  
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data
  }
  
  const data = await ExternalHttpClient.get<GetUserByIdResponse>(
    API_CONFIG.EXTERNAL_ENDPOINTS.USER_BY_ID(id)
  )
  
  userCache.set(id, { data, timestamp: now })
  
  return data
}
