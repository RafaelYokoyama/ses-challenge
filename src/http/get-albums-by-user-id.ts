'use server'

import { ExternalHttpClient } from '@/lib/http-client'
import { API_CONFIG } from '@/infra/config/api'
import type { Album } from '@/types'

interface GetAlbumsByUserIdResponse {
  albums: Album[]
}

const albumsCache = new Map<string, { data: GetAlbumsByUserIdResponse; timestamp: number }>()
const CACHE_DURATION = 30000

export async function getAlbumsByUserId(
  id: string,
): Promise<GetAlbumsByUserIdResponse> {
  const cached = albumsCache.get(id)
  const now = Date.now()
  
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.data
  }
  
  const data = await ExternalHttpClient.get<GetAlbumsByUserIdResponse>(
    API_CONFIG.EXTERNAL_ENDPOINTS.ALBUMS_BY_USER(id)
  )
  
  albumsCache.set(id, { data, timestamp: now })
  
  return data
}
