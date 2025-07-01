
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type HttpStatusCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500
export interface RequestConfig<TBody = unknown> {
  method?: HttpMethod
  headers?: Record<string, string>
  body?: TBody
  timeout?: number
  retries?: number
}
export interface ApiResponse<TData = unknown> {
  data: TData
  status: HttpStatusCode
  message?: string
  errors?: string[]
}
export interface ApiErrorResponse {
  error: string
  message?: string
  status: HttpStatusCode
  details?: Record<string, unknown>
}
export type HttpResponse<TData = unknown> = 
  | ApiResponse<TData>
  | ApiErrorResponse
  | TData
export interface PaginatedResponse<TItem = unknown> {
  items: TItem[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
export interface QueryParams {
  [key: string]: string | number | boolean | undefined
}
export interface RequestOptions<TBody = unknown> extends RequestConfig<TBody> {
  endpoint: string
  params?: QueryParams
  baseURL?: string
}
export interface IHttpClient {
  get<TResponse = unknown>(endpoint: string, options?: Omit<RequestOptions, 'body' | 'method'>): Promise<TResponse>
  post<TResponse = unknown, TBody = unknown>(endpoint: string, body?: TBody, options?: Omit<RequestOptions<TBody>, 'method'>): Promise<TResponse>
  put<TResponse = unknown, TBody = unknown>(endpoint: string, body?: TBody, options?: Omit<RequestOptions<TBody>, 'method'>): Promise<TResponse>
  delete<TResponse = unknown>(endpoint: string, options?: Omit<RequestOptions, 'body' | 'method'>): Promise<TResponse>
  patch<TResponse = unknown, TBody = unknown>(endpoint: string, body?: TBody, options?: Omit<RequestOptions<TBody>, 'method'>): Promise<TResponse>
} 