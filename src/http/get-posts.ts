'use server'

import { ExternalHttpClient } from '@/lib/http-client'
import { API_CONFIG } from '@/infra/config/api'
import type { Post } from '@/types'

interface GetPostsResponse {
  posts: Post[]
}

let postsCache: GetPostsResponse | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 30000

export const getPosts = async (): Promise<GetPostsResponse> => {
  try {
    const now = Date.now()
    
    if (postsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return postsCache
    }
    
    const data = await ExternalHttpClient.get<{ posts: Post[] }>(API_CONFIG.EXTERNAL_ENDPOINTS.POSTS)
    
    const response = {
      posts: data.posts,
    }
    
    postsCache = response
    cacheTimestamp = now
    
    return response
  } catch {
    throw new Error('Failed to fetch posts')
  }
}
