import { API_CONFIG } from '@/infra/config/api'

export interface RequestConfig {
  headers?: Record<string, string>
  timeout?: number
  retries?: number
}

export interface HttpResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
}

export interface ErrorResponse {
  message: string
  status?: number
  statusText?: string
}

class HttpClientClass {
  private baseURL: string
  private defaultConfig: RequestConfig

  constructor(baseURL = '', config: RequestConfig = {}) {
    this.baseURL = baseURL
    this.defaultConfig = {
      timeout: 10000,
      retries: 3,
      ...config,
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    config: RequestConfig = {},
    useAbsoluteURL = false
  ): Promise<T> {
    const url = useAbsoluteURL ? endpoint : `${this.baseURL}${endpoint}`
    const mergedConfig = { ...this.defaultConfig, ...config }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), mergedConfig.timeout)

    try {
     
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...mergedConfig.headers,
          ...options.headers,
        },
      })

      clearTimeout(timeoutId)
      
      const responseText = await response.text()

      let data: any
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        if (!response.ok) {
          throw new Error(responseText || `HTTP ${response.status}: ${response.statusText}`)
        }
        data = { message: responseText }
      }

      if (response.ok && data) {
        if (typeof data === 'string' && data.toUpperCase().includes('ERROR')) {
          throw new Error(data)
        }
        
        if (typeof data === 'object') {
          if (data.error || (data.message && !data.user && !data.users && data.message.toUpperCase().includes('ERROR'))) {
            const errorMessage = data.message || data.error || 'Erro desconhecido'
            throw new Error(errorMessage)
          }
        }
      }

      if (!response.ok) {
        const errorMessage = data?.message || `HTTP ${response.status}: ${response.statusText}`
        throw new Error(errorMessage)
      }

      return data
    } catch (error: unknown) {
      clearTimeout(timeoutId)
      throw error
    }
  }

  async get<T>(
    endpoint: string,
    config: RequestConfig = {},
    useAbsoluteURL = false
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' }, config, useAbsoluteURL)
  }

  async post<T>(
    endpoint: string,
    data: Record<string, unknown>,
    config: RequestConfig = {},
    useAbsoluteURL = false
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
      config,
      useAbsoluteURL
    )
  }

  async put<T>(
    endpoint: string,
    data: Record<string, unknown>,
    config: RequestConfig = {},
    useAbsoluteURL = false
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
      config,
      useAbsoluteURL
    )
  }

  async patch<T>(
    endpoint: string,
    data: Record<string, unknown>,
    config: RequestConfig = {},
    useAbsoluteURL = false
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'PATCH',
        body: JSON.stringify(data),
      },
      config,
      useAbsoluteURL
    )
  }

  async delete<T>(
    endpoint: string,
    config: RequestConfig = {},
    useAbsoluteURL = false
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' }, config, useAbsoluteURL)
  }

  setBaseURL(url: string): void {
    this.baseURL = url
  }

  getBaseURL(): string {
    return this.baseURL
  }

  async handleError(error: unknown): Promise<never> {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    
    throw new Error('An unknown error occurred')
  }

  async retryRequest<T>(
    requestFn: () => Promise<T>,
    retries = this.defaultConfig.retries || 3
  ): Promise<T> {
    let attempts = 0
    let lastError: Error

    while (attempts < retries) {
      try {
        return await requestFn()
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        attempts++
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts))
      }
    }

    throw lastError!
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

const httpClient = new HttpClientClass()

export const HttpClient = httpClient
export const ExternalHttpClient = new HttpClientClass(API_CONFIG.EXTERNAL_API_URL)
export const InternalHttpClient = new HttpClientClass(API_CONFIG.INTERNAL_API_URL) 