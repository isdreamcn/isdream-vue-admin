import type { StorageConfig } from '@/storage'
export interface AppConfig {
  storage: StorageConfig
  loginName: string
  mainName: string
  baseUrlApi: string
  baseUrlFile: string
  useMock: boolean
}

const config: AppConfig = {
  storage: {
    type: 'localStorage',
    prefix: 'isdream',
    expires: 60 * 1000,
    version: 1
  },
  // router
  loginName: 'Login',
  mainName: 'Main',
  // service
  baseUrlApi: import.meta.env.VITE_BASE_URL_API,
  baseUrlFile: import.meta.env.VITE_BASE_URL_FILE,
  useMock: import.meta.env.VITE_USE_MOCK
}

export default config
