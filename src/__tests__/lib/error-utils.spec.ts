import { classifyError, getErrorMessage, type ErrorType } from '@/lib/error-utils'

describe('error-utils', () => {
  describe('classifyError', () => {
    it('should classify duplicate email errors correctly', () => {
      const testCases = [
        'email duplicate',
        'Email already exists',
        'unique constraint failed',
        'users_email_key violation',
        'SQLSTATE 23505',
        'constraint violation with email'
      ]

      testCases.forEach(error => {
        expect(classifyError(error)).toBe('DUPLICATE_EMAIL')
      })
    })

    it('should classify validation errors correctly', () => {
      const testCases = [
        'validation failed',
        'invalid email format',
        'required field missing',
        'HTTP 400 Bad Request',
        'bad request error'
      ]

      testCases.forEach(error => {
        expect(classifyError(error)).toBe('VALIDATION_ERROR')
      })
    })

    it('should classify network errors correctly', () => {
      const testCases = [
        'network error',
        'fetch failed',
        'connection refused',
        'timeout error'
      ]

      testCases.forEach(error => {
        expect(classifyError(error)).toBe('NETWORK_ERROR')
      })
    })

    it('should classify auth errors correctly', () => {
      const testCases = [
        'HTTP 401 Unauthorized',
        'unauthorized access',
        'forbidden resource',
        'authentication failed'
      ]

      testCases.forEach(error => {
        expect(classifyError(error)).toBe('AUTH_ERROR')
      })
    })

    it('should classify server errors correctly', () => {
      const testCases = [
        'HTTP 500 Internal Server Error',
        'internal server error',
        'server error occurred'
      ]

      testCases.forEach(error => {
        expect(classifyError(error)).toBe('SERVER_ERROR')
      })
    })

    it('should classify unknown errors for unrecognized patterns', () => {
      const testCases = [
        'some random error',
        'undefined behavior',
        'mysterious problem'
      ]

      testCases.forEach(error => {
        expect(classifyError(error)).toBe('UNKNOWN_ERROR')
      })
    })

    it('should handle case insensitive classification', () => {
      expect(classifyError('EMAIL DUPLICATE')).toBe('DUPLICATE_EMAIL')
      expect(classifyError('VALIDATION FAILED')).toBe('VALIDATION_ERROR')
      expect(classifyError('NETWORK ERROR')).toBe('NETWORK_ERROR')
    })
  })

  describe('getErrorMessage', () => {
    const errorMessages: Record<ErrorType, string> = {
      'DUPLICATE_EMAIL': 'Este e-mail já está em uso!',
      'VALIDATION_ERROR': 'Dados inválidos. Verifique os campos obrigatórios.',
      'NETWORK_ERROR': 'Erro de conexão. Verifique se a API está disponível.',
      'AUTH_ERROR': 'Erro de autenticação. Verifique as credenciais.',
      'SERVER_ERROR': 'Erro interno do servidor. Tente novamente mais tarde.',
      'UNKNOWN_ERROR': 'Erro inesperado. Tente novamente.'
    }

    Object.entries(errorMessages).forEach(([errorType, expectedMessage]) => {
      it(`should return correct message for ${errorType}`, () => {
        expect(getErrorMessage(errorType as ErrorType)).toBe(expectedMessage)
      })
    })

    it('should return default message for undefined error type', () => {

      expect(getErrorMessage(undefined)).toBe('Erro inesperado. Tente novamente.')
    })
  })
}) 