export const PERFORMANCE_CONFIG = {
  SEARCH_DEBOUNCE_MS: 300,
  ITEMS_PER_PAGE: 8,
  SEARCH_CACHE_MAX_SIZE: 50,
  PREFETCH_CACHE_TTL: 5 * 60 * 1000,
  NAVIGATION_DELAY_MS: 200,
  HOVER_PREFETCH_DELAY_MS: 100,
  INTERSECTION_THRESHOLD: 0.1,
  INTERSECTION_ROOT_MARGIN: '20px',
  API_TIMEOUT_MS: 10000,
  OPTIMISTIC_UPDATE_TIMEOUT_MS: 5000,
} as const

export const PRIORITY_PREFETCH_ROUTES = [
  '/user/new',
  '/user',
] as const

export const AVOID_RSC_ROUTES = [
  '/saved',
  '/friends', 
  '/notifications',
  '/preferences',
] as const

export const INTERACTION_CONFIG = {
  SINGLE_CLICK: {
    useTransition: true,
    prefetch: true,
    delay: PERFORMANCE_CONFIG.NAVIGATION_DELAY_MS,
  },
  
  DOUBLE_CLICK: {
    useTransition: false,
    prefetch: true,
    delay: 0,
  },
  
  HOVER: {
    prefetch: true,
    delay: PERFORMANCE_CONFIG.HOVER_PREFETCH_DELAY_MS,
  },
  
  PRIORITY_BUTTON: {
    useTransition: false,
    prefetch: true,
    preload: true,
  },
} as const

export const CACHE_CONFIG = {
  USERS: {
    ttl: 5 * 60 * 1000,
    maxSize: 100,
  },
  
  SEARCH_RESULTS: {
    ttl: 2 * 60 * 1000,
    maxSize: PERFORMANCE_CONFIG.SEARCH_CACHE_MAX_SIZE,
  },
  
  METADATA: {
    ttl: 10 * 60 * 1000,
    maxSize: 50,
  },
} as const

export type InteractionType = keyof typeof INTERACTION_CONFIG
export type CacheType = keyof typeof CACHE_CONFIG 