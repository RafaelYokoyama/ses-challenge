'use server'

import { revalidatePath } from 'next/cache'
import { ExternalHttpClient } from '@/lib/http-client'
import { API_CONFIG } from '@/infra/config/api'
import { apiSchemas, validateObject } from '@/infra/utils/validators'

export interface CreateUsersResponse {
  id: string
  name: string
}

export interface CreateUserRequest {
  name: string
  email: string
}

export const createUser = async ({
  name,
  email,
}: CreateUserRequest): Promise<CreateUsersResponse | string> => {
  try {

    
    const validation = validateObject({ name, email }, apiSchemas.createUser)
    
    if (!validation.success) {
   
      return `Validation error: ${validation.error}`
    }
    
  

    const requestBody = { 
      email, 
      name, 
      password: API_CONFIG.PASSWORD 
    }

    const data = await ExternalHttpClient.post<{ user: { id: string; name: string } } | string>(
      API_CONFIG.EXTERNAL_ENDPOINTS.USER_CREATE,
      requestBody
    )
    
    
    if (typeof data === 'string') {
      return data
    }
    
    if (!data || !data.user || !data.user.id) {
      return 'Resposta inválida da API: estrutura não encontrada'
    }

    revalidatePath('/users')

    return {
      id: data.user.id,
      name: data.user.name,
    }
  } catch (error) {
    return error instanceof Error ? error.message : 'Unknown error'
  }
}
