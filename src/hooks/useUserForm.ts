import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { z } from 'zod'
import { CreateUserFormData } from '@/types'
import { createUser, createUserMetadata } from '@/services/user.service'
import { classifyError, getErrorMessage } from '@/lib/error-utils'

const formSchema = z.object({
  username: z.string()
    .trim()
    .min(1, 'Nome de usuário é obrigatório')
    .max(50, 'Nome de usuário deve ter no máximo 50 caracteres'),
  name: z.string()
    .trim()
    .min(1, 'Nome completo é obrigatório')
    .min(2, 'Nome completo deve ter pelo menos 2 caracteres')
    .max(100, 'Nome completo deve ter no máximo 100 caracteres'),
  email: z.string()
    .trim()
    .min(1, 'E-mail é obrigatório')
    .email('E-mail inválido')
    .max(100, 'E-mail deve ter no máximo 100 caracteres'),
  city: z.string()
    .trim()
    .min(1, 'Cidade é obrigatória')
    .max(50, 'Cidade deve ter no máximo 50 caracteres'),
  days: z.array(
    z.enum(['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'])
  ).min(1, 'Selecione ao menos um dia da semana'),
})

export function useUserForm() {
  const router = useRouter()
  
  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      name: '',
      email: '',
      city: '',
      days: [],
    }
  })

  const onSubmit = async (data: CreateUserFormData) => {
    try {
      console.log('📝 Dados do formulário:', data)
      console.log('📝 Name para API:', `"${data.name}"`)
      console.log('📝 Email para API:', `"${data.email}"`)
      
      const sanitizedData = {
        name: data.name?.trim() || '',
        email: data.email?.trim() || '',
      }
      
      console.log('🧹 Dados sanitizados:', sanitizedData)
      
      if (!sanitizedData.name) {
        toast.error('Nome completo é obrigatório')
        form.setError('name', { message: 'Nome completo é obrigatório' })
        return
      }
      
      if (!sanitizedData.email) {
        toast.error('E-mail é obrigatório')
        form.setError('email', { message: 'E-mail é obrigatório' })
        return
      }
      
      console.log('🚀 Iniciando criação de usuário...')
      const userResponse = await createUser(sanitizedData)

      if (typeof userResponse === 'string') {
        console.log('❌ Erro retornado pela API:', userResponse)
        
        const errorType = classifyError(userResponse)
        console.log('🔍 Tipo de erro classificado:', errorType)
        
        const message = getErrorMessage(errorType)
        console.log('📢 Mensagem final para o usuário:', message)
        
        if (errorType === 'DUPLICATE_EMAIL') {
          form.setError('email', { message })
          console.log('📧 Erro específico de email duplicado detectado')
        }
        
        toast.error(message)
        return
      }

      const user = userResponse
      
      if (!user || !user.id) {
        toast.error('Erro: Resposta inválida da API')
        return
      }
      
      try {
        console.log('📝 Criando metadados para usuário ID:', user.id)
        
        const metadataResult = await createUserMetadata({
          user_id: String(user.id),
          days: data.days,
          city: data.city,
          username: data.username,
        })

        if (metadataResult !== 'success') {
          console.error('❌ Falha ao criar metadados:', metadataResult)
          toast.error('Erro ao salvar dados adicionais do usuário')
          return
        }
        
        console.log('✅ Metadados criados com sucesso')
        
      } catch (metadataError) {
        console.error('❌ Erro na criação de metadados:', metadataError)
        toast.error('Usuário criado, mas houve erro ao salvar dados adicionais')
      }

      form.reset()
      toast.success('Usuário criado com sucesso')
      setTimeout(() => {
        router.push('/user')
      }, 100)
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'unknown error'
      const errorType = classifyError(errorMessage)
      const message = getErrorMessage(errorType)
      
      if (errorType === 'DUPLICATE_EMAIL') {
        form.setError('email', { message })
      }
      
      toast.error(message)
    }
  }

  const daysOfWeek = [
    { value: 'Segunda', label: 'Seg' },
    { value: 'Terça', label: 'Ter' },
    { value: 'Quarta', label: 'Qua' },
    { value: 'Quinta', label: 'Qui' },
    { value: 'Sexta', label: 'Sex' },
    { value: 'Sábado', label: 'Sab' },
    { value: 'Domingo', label: 'Dom' },
  ]

  return {
    form,
    onSubmit,
    daysOfWeek,
  }
} 