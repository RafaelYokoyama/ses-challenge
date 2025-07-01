export type ErrorType = 
  | 'DUPLICATE_EMAIL'
  | 'VALIDATION_ERROR'
  | 'NETWORK_ERROR'
  | 'AUTH_ERROR'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR'

  export function classifyError(error: string): ErrorType {
    const errorMessage = error.toLowerCase()
  
    if (
      errorMessage.includes('email duplicate') ||
      errorMessage.includes('email already exists') ||
      errorMessage.includes('users_email_key') ||
      errorMessage.includes('error: dup') ||
      errorMessage.includes('duplicate key') ||
      (errorMessage.includes('email') && (
        errorMessage.includes('duplicate') ||
        errorMessage.includes('constraint violation') ||
        errorMessage.includes('unique constraint') ||
        errorMessage.includes('23505')
      )) ||
   
      errorMessage.includes('unique constraint failed') ||
      errorMessage.includes('sqlstate 23505') ||
     
      errorMessage.includes('pq: duplicate key value violates unique constraint')
    ) {
      return 'DUPLICATE_EMAIL'
    }
  
    if (
      errorMessage.includes('validation') || 
      errorMessage.includes('invalid') ||
      errorMessage.includes('required') ||
      errorMessage.includes('400') ||
      errorMessage.includes('bad request')
    ) {
      return 'VALIDATION_ERROR'
    }
  
    if (
      errorMessage.includes('network') || 
      errorMessage.includes('fetch') || 
      errorMessage.includes('connect') ||
      errorMessage.includes('timeout')
    ) {
      return 'NETWORK_ERROR'
    }
  
    if (
      errorMessage.includes('401') || 
      errorMessage.includes('unauthorized') ||
      errorMessage.includes('forbidden') ||
      errorMessage.includes('authentication')
    ) {
      return 'AUTH_ERROR'
    }
  
    if (
      errorMessage.includes('500') || 
      errorMessage.includes('internal server') ||
      errorMessage.includes('server error')
    ) {
      return 'SERVER_ERROR'
    }
  
    return 'UNKNOWN_ERROR'
  }
  

  export function getErrorMessage(errorType?: ErrorType): string {
    switch (errorType) {
      case 'DUPLICATE_EMAIL':
        return 'Este e-mail já está em uso!'
      case 'VALIDATION_ERROR':
        return 'Dados inválidos. Verifique os campos obrigatórios.'
      case 'NETWORK_ERROR':
        return 'Erro de conexão. Verifique se a API está disponível.'
      case 'AUTH_ERROR':
        return 'Erro de autenticação. Verifique as credenciais.'
      case 'SERVER_ERROR':
        return 'Erro interno do servidor. Tente novamente mais tarde.'
      case 'UNKNOWN_ERROR':
      default:
        return 'Erro inesperado. Tente novamente.'
    }
  }
  