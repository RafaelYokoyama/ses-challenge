export { env, API_BASE_URL, IS_DEVELOPMENT, IS_PRODUCTION, IS_TEST } from './config/env'
export { API_CONFIG, DEFAULT_HEADERS, buildExternalUrl, buildInternalUrl } from './config/api'
export type { 
  HttpMethod, 
  HttpStatusCode, 
  RequestConfig, 
  ApiResponse, 
  ApiErrorResponse,
  HttpResponse,
  PaginatedResponse,
  QueryParams,
  RequestOptions,
  IHttpClient 
} from './types/http'
export { 
  schemas,
  isValidUrl,
  isValidEmail,
  isNonEmptyString,
  isPositiveNumber,
  isNonEmptyArray,
  isValidId,
  isValidDate,
  validateObject,
  validateWithLogs,
  guards,
  envSchema,
  apiSchemas 
} from './utils/validators'

import * as validators from './utils/validators'
import { API_CONFIG, buildExternalUrl, buildInternalUrl } from './config/api'
import { env } from './config/env'

export const infra = {
  config: {
    api: API_CONFIG,
    env,
  },
  validators,
  schemas: validators.schemas,
  helpers: {
    buildExternalUrl,
    buildInternalUrl,
    validateObject: validators.validateObject,
    validateWithLogs: validators.validateWithLogs,
  }
} as const 