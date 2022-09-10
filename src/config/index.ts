import type { RouteMeta } from 'vue-router'
import type { StorageConfig } from '@/storage'
import type { ServiceTokenConfig } from '@/service/interceptors'
import { wrapperImportMetaEnv } from '@/utils'

export interface AppConfig {
  storageConfig: StorageConfig
  serviceTokenConfig: ServiceTokenConfig
  defaultRouteMeta: RouteMeta
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
  // router
  defaultRouteMeta: {
    verifyAuth: true
  },
  loginName: 'Login',
  mainName: 'Main',

  baseUrlApi: viteEnv.VITE_BASE_URL_API,
  baseUrlFile: viteEnv.VITE_BASE_URL_FILE,
  useMock: viteEnv.VITE_USE_MOCK
}

export default config
