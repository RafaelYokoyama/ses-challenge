'use server'

import { ExternalHttpClient } from '@/lib/http-client'
import { API_CONFIG } from '@/infra/config/api'
import type { Post } from '@/types'

interface GetPostsByUserIdResponse {
  posts: Post[]
}

const postsCache = new Map<string, { data: GetPostsByUserIdResponse; timestamp: number }>()
const CACHE_DURATION = 30000

export async function getPostsByUserId(
  id: string,
): Promise<GetPostsByUserIdResponse> {
  const cached = postsCache.get(id)
  const now = Date.now()
  
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data
  }
  
  const data = await ExternalHttpClient.get<GetPostsByUserIdResponse>(
    API_CONFIG.EXTERNAL_ENDPOINTS.POSTS_BY_USER(id)
  )
  
  postsCache.set(id, { data, timestamp: now })
  
  return data
}
