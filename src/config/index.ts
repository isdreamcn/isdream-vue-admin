import type { RouteMeta } from 'vue-router'
import type { StorageConfig } from '@/storage'
import type { ServiceTokenConfig } from '@/service'
import { wrapperImportMetaEnv } from '@/utils'

export type DefaultRouteMeta = Required<Pick<RouteMeta, 'keepAlive'>>
export interface AppConfig {
  storageConfig: StorageConfig
  serviceTokenConfig: ServiceTokenConfig
  defaultRouteMeta: DefaultRouteMeta
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
    expires: 7 * 24 * 60 * 60 * 1000,
    version: 1
  },
  // service
  serviceTokenConfig: {
    position: 'headers',
    key: 'Authorization',
    value: 'Bearer TOKEN',
    expires: 7 * 24 * 60 * 60 * 1000
  },
  // router
  defaultRouteMeta: {
    keepAlive: true
  },
  loginName: 'Login',
  mainName: 'Main',

  baseUrlApi: viteEnv.VITE_BASE_URL_API,
  baseUrlFile: viteEnv.VITE_BASE_URL_FILE,
  useMock: viteEnv.VITE_USE_MOCK
}

export default config
