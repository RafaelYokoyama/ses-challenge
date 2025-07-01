'use server'

import { API_CONFIG } from '@/infra/config/api'

interface GetUsersResponse {
  name: string
  menu: {
    label: string
    route: string
  }[]
}

let profileCache: GetUsersResponse | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 300000 

export const getUserProfile = async (): Promise<GetUsersResponse> => {
  const now = Date.now()
  
  if (profileCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return profileCache
  }

  const url = `${API_CONFIG.INTERNAL_API_URL}/api/user`
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
    next: { revalidate: 300 }
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }

  const data = await response.json()
  profileCache = data
  cacheTimestamp = now
  
  return data
}
