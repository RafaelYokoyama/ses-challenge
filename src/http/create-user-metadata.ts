'use server'

import { revalidatePath } from 'next/cache'

import { API_CONFIG } from '@/infra/config/api'

interface CreateUserMetaDataProps {
  user_id: string
  username: string
  city: string
  days: string[]
}

export const createUserMetaData = async ({
  user_id,
  city,
  days,
  username,
}: CreateUserMetaDataProps) => {
  try {
    console.log('📦 Criando metadata do usuário:', { user_id, city, days, username })
    
    const response = await fetch(`${API_CONFIG.INTERNAL_API_URL}${API_CONFIG.INTERNAL_ENDPOINTS.USER_METADATA}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, city, days, username }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Erro ao criar metadata:', errorText)
      throw new Error(`Erro ao salvar metadados: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    console.log('✅ Metadata criado com sucesso:', result)

    revalidatePath('/users')
    return 'success'
    
  } catch (error) {
    console.error('❌ Erro na criação de metadata:', error)
    throw error
  }
}
