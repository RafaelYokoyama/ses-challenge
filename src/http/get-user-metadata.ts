'use server'

import { InternalHttpClient } from '@/lib/http-client'
import { API_CONFIG } from '@/infra/config/api'
import type { UserMetadata } from '@/types'

interface GetUsersResponse {
  users: UserMetadata[]
}

export const getUsersMetaData = async (): Promise<GetUsersResponse> => {
  const data = await InternalHttpClient.get<UserMetadata[]>(
    API_CONFIG.INTERNAL_ENDPOINTS.USER_METADATA
  )

  return {
    users: data.map((user) => ({
      user_id: user.user_id,
      days: user.days || [],
      city: user.city || 'Unknown',
      username: user.username || 'Unknown',
    })),
  }
}
