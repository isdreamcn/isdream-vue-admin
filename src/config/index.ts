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
  userMenuStorage: boolean
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
  // store/user
  storeConfig: {
    // storage是否存储userMenu
    userMenuStorage: false,
    // storage是否存储、userPermissions
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
    // 使用KeepAlive进行缓存
    keepAlive: true,
    hiddenInMenu: false,
    hiddenInBread: false,
    // router/guard
    needLoading: false,
    needToken: true,
    needRouteHistory: true
  },

  // router/routes/index `routesHandler`
  routesHandlerOptions: {
    // 生成全部菜单，不使用权限菜单(store/user `setUserMenu`)
    generatorMenu: true,
    // router.addRoute(`addRouteParentName`, [])
    addRouteParentName: '__ROUTE_TEMP_NAME',
    // 路由扁平化，只注册最后一层route，性能比较高。（但父级route不会注册, 缓存路由较深时推荐使用）
    // 父级route不会注册，父级的`redirect`不生效
    flatRoutes: true
  },

  // route name
  routeMainName: '__ROUTE_MAIN_NAME',
  routeLoginName: '__ROUTE_LOGIN_NAME',

  // .env
  baseUrlApi: viteEnv.VITE_BASE_URL_API,
  baseUrlFile: viteEnv.VITE_BASE_URL_FILE,
  useMock: viteEnv.VITE_USE_MOCK
}

config.routesHandlerOptions.addRouteParentName = config.routeMainName

export const appConfig = readonly(config)
export default appConfig
