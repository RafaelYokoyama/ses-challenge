'use server'

import { ExternalHttpClient } from '@/lib/http-client'
import { API_CONFIG } from '@/infra/config/api'
import type { Album } from '@/types'

interface GetAlbumsResponse {
  albums: Album[]
}

let albumsCache: GetAlbumsResponse | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 30000

export const getAlbums = async (): Promise<GetAlbumsResponse> => {
  try {
    const now = Date.now()
    
    if (albumsCache && (now - cacheTimestamp) < CACHE_DURATION) {
      return albumsCache
    }
    
    const data = await ExternalHttpClient.get<{ albums: Album[] }>(
      API_CONFIG.EXTERNAL_ENDPOINTS.ALBUMS
    )

    const response = {
      albums: data.albums,
    }
    
    albumsCache = response
    cacheTimestamp = now

    return response
  } catch {
    throw new Error('Failed to fetch albums')
  }
}
