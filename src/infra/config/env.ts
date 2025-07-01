import { envSchema, type EnvConfig } from '../utils/validators'

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('❌ Environment validation failed:', parsed.error.format())
  throw new Error('Environment validation failed')
}

const config: EnvConfig = parsed.data

export const env = {
  apiUrl: config.NEXT_PUBLIC_API_URL.replace(/\/$/, ''),
  frontendUrl: config.NEXT_PUBLIC_FRONTEND_URL.replace(/\/$/, ''),
  password: config.PASSWORD,
  nodeEnv: config.NODE_ENV,
  isDevelopment: config.NODE_ENV === 'development',
  isProduction: config.NODE_ENV === 'production',
  isTest: config.NODE_ENV === 'test',
  get debug() {
    return {
      apiUrl: this.apiUrl,
      frontendUrl: this.frontendUrl,
      hasPassword: !!this.password,
      nodeEnv: this.nodeEnv,
      isDevelopment: this.isDevelopment,
      isProduction: this.isProduction,
      isTest: this.isTest,
    }
  },
}

export const API_BASE_URL = env.apiUrl
export const IS_DEVELOPMENT = env.isDevelopment
export const IS_PRODUCTION = env.isProduction
export const IS_TEST = env.isTest
export type { EnvConfig }

if (IS_DEVELOPMENT) {
  console.log('✅ Environment loaded & validated:', env.debug)
}
