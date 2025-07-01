'use server'

import { ExternalHttpClient } from '@/lib/http-client'
import { API_CONFIG } from '@/infra/config/api'

export const deleteUser = async (user_id: string) => {
  try {
    await ExternalHttpClient.delete(API_CONFIG.EXTERNAL_ENDPOINTS.USER_DELETE(user_id))
    return 'success'
  } catch {
    throw new Error('Failed to delete user')
  }
}
