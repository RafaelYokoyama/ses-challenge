import { z } from 'zod'
export const schemas = {
  url: z.string().url('URL inválida'),
  urlOptional: z.string().url('URL inválida').optional(),
  
  email: z.string().email('Email inválido'),
  emailOptional: z.string().email('Email inválido').optional(),
  
  nonEmptyString: z.string().min(1, 'String não pode estar vazia').trim(),
  optionalString: z.string().optional(),
  
  positiveNumber: z.number().positive('Número deve ser positivo'),
  port: z.number().int().min(1).max(65535, 'Porta deve estar entre 1 e 65535'),
  
  nonEmptyArray: z.array(z.unknown()).min(1, 'Array não pode estar vazio'),
  
  id: z.union([
    z.string().min(1, 'ID não pode estar vazio'),
    z.number().positive('ID deve ser positivo')
  ]),
  
  date: z.date(),
  dateString: z.string().datetime('Data inválida'),
  isoDate: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/, 'Data ISO inválida'),
  
  password: z.string().min(3, 'Password deve ter pelo menos 3 caracteres'),
  
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
} as const
export const isValidUrl = (url: string): boolean => {
  return schemas.url.safeParse(url).success
}

export const isValidEmail = (email: string): boolean => {
  return schemas.email.safeParse(email).success
}

export const isNonEmptyString = (value: unknown): value is string => {
  return schemas.nonEmptyString.safeParse(value).success
}

export const isPositiveNumber = (value: unknown): value is number => {
  return schemas.positiveNumber.safeParse(value).success
}

export const isNonEmptyArray = <T>(value: unknown): value is T[] => {
  return schemas.nonEmptyArray.safeParse(value).success
}

export const isValidId = (value: unknown): value is string | number => {
  return schemas.id.safeParse(value).success
}

export const isValidDate = (value: unknown): value is Date => {
  return schemas.date.safeParse(value).success
}
export function validateObject<T>(
  obj: unknown,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; error: string; issues: string[] } {
  const result = schema.safeParse(obj)
  
  if (result.success) {
    return { success: true, data: result.data }
  }
  
  const issues = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
  
  return { 
    success: false, 
    error: result.error.errors[0]?.message || 'Validation failed',
    issues
  }
}
export const guards = {
  isString: (value: unknown): value is string => typeof value === 'string',
  isNumber: (value: unknown): value is number => typeof value === 'number' && !isNaN(value),
  isBoolean: (value: unknown): value is boolean => typeof value === 'boolean',
  isArray: <T>(value: unknown): value is T[] => Array.isArray(value),
  isObject: (value: unknown): value is Record<string, unknown> => 
    typeof value === 'object' && value !== null && !Array.isArray(value),
  isFunction: (value: unknown): value is (...args: unknown[]) => unknown => typeof value === 'function',
  isUndefined: (value: unknown): value is undefined => value === undefined,
  isNull: (value: unknown): value is null => value === null,
  isNullish: (value: unknown): value is null | undefined => value == null,
} as const
export const envSchema = z.object({
  NEXT_PUBLIC_API_URL: schemas.url.default('http://localhost:8080'),
  NEXT_PUBLIC_FRONTEND_URL: schemas.url.default('http://localhost:3000'),
  PASSWORD: schemas.password.default('password123'),
  NODE_ENV: schemas.nodeEnv,
})

export type EnvConfig = z.infer<typeof envSchema>
export const apiSchemas = {
  createUser: z.object({
    name: z.string()
      .trim()
      .min(1, 'Nome é obrigatório')
      .max(100, 'Nome deve ter no máximo 100 caracteres'),
    email: z.string()
      .trim()
      .min(1, 'E-mail é obrigatório')
      .email('E-mail inválido')
      .max(100, 'E-mail deve ter no máximo 100 caracteres'),
  }),
  
  userMetadata: z.object({
    user_id: schemas.id,
    username: schemas.nonEmptyString,
    city: schemas.nonEmptyString,
    days: z.array(z.string()).min(1, 'Pelo menos um dia deve ser selecionado'),
  }),
  
  user: z.object({
    id: schemas.id,
    name: schemas.nonEmptyString,
    email: schemas.email,
    created_at: schemas.isoDate,
    updated_at: schemas.isoDate,
  }),
} as const
export function validateWithLogs<T>(
  data: unknown,
  schema: z.ZodSchema<T>,
  context = 'Data'
): T {
  const result = schema.safeParse(data)
  
  if (result.success) {
    console.log(`✅ ${context} validation successful`)
    return result.data
  }
  
  const errors = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`)
  console.error(`❌ ${context} validation failed:`, errors)
  
  throw new Error(`${context} validation failed: ${errors.join(', ')}`)
} 