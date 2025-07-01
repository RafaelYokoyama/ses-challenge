import { env } from './env'

export const API_CONFIG = {
  EXTERNAL_API_URL: env.apiUrl,
  INTERNAL_API_URL: env.frontendUrl,
  PASSWORD: env.password,
  
  EXTERNAL_ENDPOINTS: {
    USERS: '/api/v1/users',
    USER_CREATE: '/api/v1/users/create',
    USER_BY_ID: (id: string) => `/api/v1/users/${id}`,
    USER_DELETE: (id: string) => `/api/v1/users/${id}`,
    
    POSTS: '/api/v1/posts',
    POSTS_BY_USER: (userId: string) => `/api/v1/users/${userId}/posts`,
    
    ALBUMS: '/api/v1/albums',
    ALBUMS_BY_USER: (userId: string) => `/api/v1/users/${userId}/albums`,
  },

  INTERNAL_ENDPOINTS: {
    USER_METADATA: '/api/usermetadata',
  }
} as const

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
} as const

export const buildExternalUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${API_CONFIG.EXTERNAL_API_URL}${cleanEndpoint}`
}

export const buildInternalUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${API_CONFIG.INTERNAL_API_URL}${cleanEndpoint}`
} 