import { classifyError, getErrorMessage, type ErrorType } from '@/lib/error-utils'

describe('error-utils', () => {
  describe('classifyError', () => {
    it.each([
      'email duplicate',
      'Email already exists',
      'unique constraint failed',
      'users_email_key violation',
      'SQLSTATE 23505',
      'constraint violation with email',
    ])('should classify "%s" as DUPLICATE_EMAIL', (errorMsg) => {
      expect(classifyError(errorMsg)).toBe('DUPLICATE_EMAIL')
    })

    it.each([
      'validation failed',
      'invalid email format',
      'required field missing',
      'HTTP 400 Bad Request',
      'bad request error',
    ])('should classify "%s" as VALIDATION_ERROR', (errorMsg) => {
      expect(classifyError(errorMsg)).toBe('VALIDATION_ERROR')
    })

    it.each([
      'network error',
      'fetch failed',
      'connection refused',
      'timeout error',
    ])('should classify "%s" as NETWORK_ERROR', (errorMsg) => {
      expect(classifyError(errorMsg)).toBe('NETWORK_ERROR')
    })

    it.each([
      'HTTP 401 Unauthorized',
      'unauthorized access',
      'forbidden resource',
      'authentication failed',
    ])('should classify "%s" as AUTH_ERROR', (errorMsg) => {
      expect(classifyError(errorMsg)).toBe('AUTH_ERROR')
    })

    it.each([
      'HTTP 500 Internal Server Error',
      'internal server error',
      'server error occurred',
    ])('should classify "%s" as SERVER_ERROR', (errorMsg) => {
      expect(classifyError(errorMsg)).toBe('SERVER_ERROR')
    })

    it.each([
      'some random error',
      'undefined behavior',
      'mysterious problem',
    ])('should classify "%s" as UNKNOWN_ERROR', (errorMsg) => {
      expect(classifyError(errorMsg)).toBe('UNKNOWN_ERROR')
    })

    it.each([
      ['EMAIL DUPLICATE', 'DUPLICATE_EMAIL'],
      ['VALIDATION FAILED', 'VALIDATION_ERROR'],
      ['NETWORK ERROR', 'NETWORK_ERROR'],
    ])('should classify "%s" (case-insensitive) as %s', (msg, expected) => {
      expect(classifyError(msg)).toBe(expected)
    })
  })

  describe('getErrorMessage', () => {
    const errorMessages: Record<ErrorType, string> = {
      DUPLICATE_EMAIL: 'Este e-mail já está em uso!',
      VALIDATION_ERROR: 'Dados inválidos. Verifique os campos obrigatórios.',
      NETWORK_ERROR: 'Erro de conexão. Verifique se a API está disponível.',
      AUTH_ERROR: 'Erro de autenticação. Verifique as credenciais.',
      SERVER_ERROR: 'Erro interno do servidor. Tente novamente mais tarde.',
      UNKNOWN_ERROR: 'Erro inesperado. Tente novamente.',
    }

    it.each(Object.entries(errorMessages))(
      'should return correct message for %s',
      (errorType, expectedMessage) => {
        expect(getErrorMessage(errorType as ErrorType)).toBe(expectedMessage)
      }
    )

  
  })
})
