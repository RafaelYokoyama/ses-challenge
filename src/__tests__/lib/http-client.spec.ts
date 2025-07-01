import { HttpClient, ExternalHttpClient, InternalHttpClient, ApiError } from '@/lib/http-client'

jest.mock('@/infra/config/api', () => ({
  API_CONFIG: {
    EXTERNAL_API_URL: 'https://external.api.com',
    INTERNAL_API_URL: 'http://localhost:3000',
    PASSWORD: 'test-password',
    EXTERNAL_ENDPOINTS: {
      USERS: '/api/v1/users',
      USER_CREATE: '/api/v1/users/create',
      USER_BY_ID: (id: string) => `/api/v1/users/${id}`,
      USER_DELETE: (id: string) => `/api/v1/users/${id}`,
      POSTS: '/api/v1/posts',
      POSTS_BY_USER: (userId: string) => `/api/v1/users/${userId}/posts`,
      ALBUMS: '/api/v1/albums',
      ALBUMS_BY_USER: (userId: string) => `/api/v1/users/${userId}/albums`,
    },
    INTERNAL_ENDPOINTS: {
      USER_METADATA: '/api/usermetadata',
    }
  },
  buildExternalUrl: jest.fn((endpoint) => `https://external.api.com${endpoint}`),
  buildInternalUrl: jest.fn((endpoint) => `http://localhost:3000${endpoint}`),
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'User-Agent': 'Test-Client'
  }
}))

global.fetch = jest.fn()

const originalEnv = process.env

describe('http-client', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.MockedFunction<typeof fetch>).mockClear()
    process.env = { ...originalEnv }
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  afterAll(() => {
    process.env = originalEnv
  })

  describe('HttpClient', () => {
    describe('GET requests', () => {
      it('should make successful GET request with default HttpClient', async () => {
        const mockData = { id: 1, name: 'Test' }
        ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
          ok: true,
          status: 200,
          headers: new Headers({ 'Content-Type': 'application/json' }),
          text: async () => JSON.stringify(mockData),
        } as Response)

        const result = await HttpClient.get('/users/1')

        expect(fetch).toHaveBeenCalledWith(
          '/users/1',
          expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
              'Content-Type': 'application/json'
            })
          })
        )
        expect(result).toEqual(mockData)
      })

      it('should make successful GET request with ExternalHttpClient', async () => {
        const mockData = { id: 1, name: 'Test' }
        ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
          ok: true,
          status: 200,
          headers: new Headers({ 'Content-Type': 'application/json' }),
          text: async () => JSON.stringify(mockData),
        } as Response)

        const result = await ExternalHttpClient.get('/users/1')

        expect(fetch).toHaveBeenCalledWith(
          'https://external.api.com/users/1',
          expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
              'Content-Type': 'application/json'
            })
          })
        )
        expect(result).toEqual(mockData)
      })

      it('should make successful GET request with InternalHttpClient', async () => {
        const mockData = { id: 1, name: 'Test' }
        ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
          ok: true,
          status: 200,
          headers: new Headers({ 'Content-Type': 'application/json' }),
          text: async () => JSON.stringify(mockData),
        } as Response)

        const result = await InternalHttpClient.get('/users/1')

        expect(fetch).toHaveBeenCalledWith(
          'http://localhost:3000/users/1',
          expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
              'Content-Type': 'application/json'
            })
          })
        )
        expect(result).toEqual(mockData)
      })


      it('should handle non-JSON responses', async () => {
        const mockTextResponse = 'Plain text response'
        ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
          ok: true,
          status: 200,
          headers: new Headers({ 'Content-Type': 'text/plain' }),
          text: async () => mockTextResponse,
        } as Response)

        const result = await ExternalHttpClient.get('/users/1')

        expect(result).toEqual({ message: mockTextResponse })
      })
    })

    describe('POST requests', () => {
      it('should make successful POST request with body', async () => {
        const requestBody = { name: 'New User', email: 'test@example.com' }
        const responseBody = { id: 1, ...requestBody }

        ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
          ok: true,
          status: 201,
          headers: new Headers({ 'Content-Type': 'application/json' }),
          text: async () => JSON.stringify(responseBody),
        } as Response)

        const result = await ExternalHttpClient.post('/users', requestBody)

        expect(fetch).toHaveBeenCalledWith(
          'https://external.api.com/users',
          expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify(requestBody)
          })
        )
        expect(result).toEqual(responseBody)
      })
    })

    describe('PUT requests', () => {
      it('should make successful PUT request', async () => {
        const requestBody = { name: 'Updated User' }

        ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
          ok: true,
          status: 200,
          headers: new Headers({ 'Content-Type': 'application/json' }),
          text: async () => JSON.stringify(requestBody),
        } as Response)

        const result = await ExternalHttpClient.put('/users/1', requestBody)

        expect(fetch).toHaveBeenCalledWith(
          'https://external.api.com/users/1',
          expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify(requestBody)
          })
        )
        expect(result).toEqual(requestBody)
      })
    })

    describe('DELETE requests', () => {
      it('should make successful DELETE request', async () => {
        ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
          ok: true,
          status: 204,
          headers: new Headers(),
          text: async () => '',
        } as Response)

        const result = await ExternalHttpClient.delete('/users/1')

        expect(fetch).toHaveBeenCalledWith(
          'https://external.api.com/users/1',
          expect.objectContaining({
            method: 'DELETE'
          })
        )
        expect(result).toEqual({ message: '' })
      })
    })

    describe('PATCH requests', () => {
      it('should make successful PATCH request', async () => {
        const patchData = { name: 'Patched Name' }

        ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
          ok: true,
          status: 200,
          headers: new Headers({ 'Content-Type': 'application/json' }),
          text: async () => JSON.stringify(patchData),
        } as Response)

        const result = await ExternalHttpClient.patch('/users/1', patchData)

        expect(fetch).toHaveBeenCalledWith(
          'https://external.api.com/users/1',
          expect.objectContaining({
            method: 'PATCH',
            body: JSON.stringify(patchData)
          })
        )
        expect(result).toEqual(patchData)
      })
    })

    describe('Error handling', () => {
      it('should handle network errors', async () => {
        ;(fetch as jest.MockedFunction<typeof fetch>).mockRejectedValue(
          new TypeError('fetch failed')
        )

        await expect(ExternalHttpClient.get('/users')).rejects.toThrow()
      })

      it('should handle timeout errors', async () => {
        const mockAbortError = new Error('AbortError')
        mockAbortError.name = 'AbortError'
        
        ;(fetch as jest.MockedFunction<typeof fetch>).mockRejectedValue(mockAbortError)

        await expect(ExternalHttpClient.get('/users')).rejects.toThrow()
      })

      it('should handle API errors in response body', async () => {
        const errorResponse = { message: 'User not found' }
        ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
          ok: false,
          status: 404,
          statusText: 'Not Found',
          text: async () => JSON.stringify(errorResponse),
        } as Response)

        await expect(ExternalHttpClient.get('/users/999')).rejects.toThrow('User not found')
      })

      it('should handle error responses with 200 status but error content', async () => {
        const errorResponse = { error: 'Something went wrong' }
        ;(fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
          ok: true,
          status: 200,
          statusText: 'OK',
          text: async () => JSON.stringify(errorResponse),
        } as Response)

        await expect(ExternalHttpClient.get('/users/1')).rejects.toThrow('Something went wrong')
      })
    })

    describe('Configuration methods', () => {
      it('should allow setting and getting base URL', () => {
        const newUrl = 'https://new-api.com'
        HttpClient.setBaseURL(newUrl)
        
        expect(HttpClient.getBaseURL()).toBe(newUrl)
      })
    })
  })

  describe('ApiError', () => {
    it('should create ApiError with message only', () => {
      const error = new ApiError('Test error')

      expect(error.name).toBe('ApiError')
      expect(error.message).toBe('Test error')
      expect(error.status).toBeUndefined()
      expect(error.response).toBeUndefined()
    })

    it('should create ApiError with all parameters', () => {
      const mockResponse = {} as Response
      const error = new ApiError('Test error', 404, mockResponse)

      expect(error.name).toBe('ApiError')
      expect(error.message).toBe('Test error')
      expect(error.status).toBe(404)
      expect(error.response).toBe(mockResponse)
    })

    it('should be instance of Error', () => {
      const error = new ApiError('Test error')

      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(ApiError)
    })
  })
}) 