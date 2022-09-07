import type { StorageConfig } from '@/storage'

export interface AppConfig {
  storage: StorageConfig
  loginName: string
  mainName: string
  useMock: boolean
}

const config: AppConfig = {
  storage: {
    type: 'localStorage',
    prefix: 'isdream',
    expires: 60 * 1000,
    version: 1
  },
  useMock: true,
  // router
  loginName: 'Login',
  mainName: 'Main'
}

export default config
