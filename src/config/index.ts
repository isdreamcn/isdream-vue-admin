import type { RouteMeta } from 'vue-router'
import type { StorageConfig } from '@/storage'
import type { ServiceTokenConfig } from '@/service'
import { wrapperImportMetaEnv } from '@/utils'

export type DefaultRouteMeta = Required<
  Pick<
    RouteMeta,
    | 'keepAlive'
    | 'hiddenInMenu'
    | 'hiddenInBread'
    | 'needLoading'
    | 'needToken'
    | 'needRouteHistory'
  >
>

interface StoreConfig {
  // store/user, storage是否存储userMenu、userPermissions
  userStorage: boolean
}

export interface AppConfig {
  storeConfig: StoreConfig
  storageConfig: StorageConfig
  serviceTokenConfig: ServiceTokenConfig
  defaultRouteMeta: DefaultRouteMeta
  routeMainName: symbol
  routeLoginName: symbol
  baseUrlApi: string
  baseUrlFile: string
  useMock: boolean
}

const viteEnv = wrapperImportMetaEnv(import.meta.env)

const config: Readonly<AppConfig> = {
  // store
  storeConfig: {
    userStorage: true
  },
  // storage
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
    keepAlive: true,
    hiddenInMenu: false,
    hiddenInBread: false,
    needLoading: false,
    needToken: true,
    needRouteHistory: true
  },

  // route name
  routeMainName: Symbol('main'),
  routeLoginName: Symbol('login'),

  baseUrlApi: viteEnv.VITE_BASE_URL_API,
  baseUrlFile: viteEnv.VITE_BASE_URL_FILE,
  useMock: viteEnv.VITE_USE_MOCK
}

export default config
