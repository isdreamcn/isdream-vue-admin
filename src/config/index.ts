import type { StorageConfig } from '@/storage'
import type { ServiceTokenConfig } from '@/service/interceptors'
import { wrapperImportMetaEnv } from '@/utils'

export interface AppConfig {
  storageConfig: StorageConfig
  serviceTokenConfig: ServiceTokenConfig
  loginName: string
  mainName: string
  baseUrlApi: string
  baseUrlFile: string
  useMock: boolean
}

const viteEnv = wrapperImportMetaEnv(import.meta.env)

const config: AppConfig = {
  storageConfig: {
    type: 'localStorage',
    prefix: 'isdream',
    expires: 60 * 1000,
    version: 1
  },
  // service
  serviceTokenConfig: {
    position: 'headers',
    key: 'Authorization',
    value: 'Bearer TOKEN',
    expires: 7 * 24 * 3600
  },
  baseUrlApi: viteEnv.VITE_BASE_URL_API,
  baseUrlFile: viteEnv.VITE_BASE_URL_FILE,
  useMock: viteEnv.VITE_USE_MOCK,

  // router
  loginName: 'Login',
  mainName: 'Main'
}

export default config
