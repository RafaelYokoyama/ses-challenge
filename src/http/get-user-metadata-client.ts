import { generateUserMetaData } from '@/lib/generate-metatada'

export interface UserMeta {
  user_id: string
  days: string[]
  city: string
  username: string
}

let metadataCache: UserMeta[] = []
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000
function isCacheValid(): boolean {
  return metadataCache.length > 0 && (Date.now() - cacheTimestamp) < CACHE_DURATION
}

function isServer(): boolean {
  return typeof window === 'undefined'
}
export function invalidateMetadataCache(): void {
  metadataCache = []
  cacheTimestamp = 0
 
}

export async function getAllUserMetadataClient(): Promise<UserMeta[]> {
  if (isServer()) {

    return []
  }
  if (isCacheValid()) {
 
    return metadataCache
  }

  try {

    
    const response = await fetch('/api/usermetadata', {
      cache: 'force-cache',
      next: { revalidate: 300 }
    })
    
    if (!response.ok) {
  
      throw new Error('Failed to fetch user metadata')
    }
    
    const data = await response.json()
    
    metadataCache = Array.isArray(data) ? data : []
    cacheTimestamp = Date.now()
    

    
    return metadataCache
  } catch (error) {
    console.error('❌ Erro completo na API de metadata:', error)

    return []
  }
}

export async function getUsersMetadataClient(userIds: string[]): Promise<Map<string, UserMeta>> {
  if (isServer()) {

    return new Map()
  }


  
  const allMetadata = await getAllUserMetadataClient()
  const metadataMap = new Map<string, UserMeta>()
  
  allMetadata.forEach(meta => {
    metadataMap.set(meta.user_id, meta)
  })
  
  const missingUserIds = userIds.filter(id => !metadataMap.has(id))
  
  if (missingUserIds.length > 0) {

    
    const newMetadataList: UserMeta[] = missingUserIds.map(userId => {
      const generated = generateUserMetaData(userId)
      return {
        user_id: userId,
        username: generated.username,
        days: generated.days,
        city: generated.city
      }
    })
    
    await createMultipleUserMetadataClient(newMetadataList)
    
    newMetadataList.forEach(meta => {
      metadataMap.set(meta.user_id, meta)
      metadataCache.push(meta)
    })
    

  }
  

  return metadataMap
}

export async function getUserMetadataClient(userId: string): Promise<UserMeta> {
  const metadataMap = await getUsersMetadataClient([userId])
  const metadata = metadataMap.get(userId)
  
  if (!metadata) {
    throw new Error(`Failed to get or create metadata for user ${userId}`)
  }
  
  return metadata
}

async function createMultipleUserMetadataClient(metadataList: UserMeta[]): Promise<void> {
  if (metadataList.length === 0) return
  
  if (isServer()) {

    return
  }
  

  
  try {
    const promises = metadataList.map(async (metadata) => {
      const response = await fetch('/api/usermetadata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(metadata),
      })
      
      if (!response.ok) {
        throw new Error(`Failed to save metadata for user ${metadata.user_id}`)
      }
      
      return response.json()
    })
    
    await Promise.all(promises)

  } catch (error) {
    
    throw error
  }
}

export async function createUserMetadataClient(metadata: UserMeta): Promise<void> {
  if (isServer()) {
 
    return
  }


  
  const response = await fetch('/api/usermetadata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  })
  
  if (!response.ok) {
    throw new Error('Failed to save user metadata')
  }
  
  const existingIndex = metadataCache.findIndex(m => m.user_id === metadata.user_id)
  if (existingIndex >= 0) {
    metadataCache[existingIndex] = metadata
  } else {
    metadataCache.push(metadata)
  }
  

} 