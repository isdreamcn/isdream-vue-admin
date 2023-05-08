import type { RouteMeta } from 'vue-router'
import type { StorageConfig } from '@/storage'
import type { ServiceTokenConfig } from '@/service'
import type { RoutesHandlerOptions } from '@/router/utils'
import { readonly } from 'vue'
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
  // store/user
  // storage是否存储userMenu
  userMenuStorage: boolean
  // storage是否存储、userPermissions
  userPermissionsStorage: boolean
}

export interface AppConfig {
  storeConfig: StoreConfig
  storageConfig: StorageConfig
  serviceTokenConfig: ServiceTokenConfig
  defaultRouteMeta: DefaultRouteMeta
  routesHandlerOptions: RoutesHandlerOptions
  routeMainName: string
  routeLoginName: string
  baseUrlApi: string
  baseUrlFile: string
  useMock: boolean
}

const viteEnv = wrapperImportMetaEnv(import.meta.env)

const config: Readonly<AppConfig> = {
  // store
  storeConfig: {
    userMenuStorage: false,
    userPermissionsStorage: false
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

  // router/routes/index
  routesHandlerOptions: {
    generatorMenu: true,
    addRouteParentName: 'temp',
    flatRoutes: true
  },

  // route name
  routeMainName: '__ROUTE_MAIN_NAME',
  routeLoginName: '__ROUTE_LOGIN_NAME',

  baseUrlApi: viteEnv.VITE_BASE_URL_API,
  baseUrlFile: viteEnv.VITE_BASE_URL_FILE,
  useMock: viteEnv.VITE_USE_MOCK
}

config.routesHandlerOptions.addRouteParentName = config.routeMainName

export const appConfig = readonly(config)
export default appConfig
