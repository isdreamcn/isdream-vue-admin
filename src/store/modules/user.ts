import { defineStore } from 'pinia'
import db, { StorageSetOptions } from '@/storage'
import { appConfig } from '@/config'
import type { RoleMenu } from '@/router/useRoutesHandler/types'
import router, { routesHandler } from '@/router'
import { useRouterStore } from './router'
import {
  UserLoginParams,
  userLogin,
  getRoleMenu,
  getUserPermissions
} from '@/api/user/login'

export interface UserMenu {
  title: string
  name?: string
  // 唯一key，多级路由地址拼接，/开头
  path: string
  icon?: string
  link?: string
  children?: UserMenu[]
}

export interface UserInfo {
  id?: number
  username: string
  avatar?: string
}

interface UserState {
  token: string
  userInfo: Nullable<UserInfo>
  roleMenu: Nullable<RoleMenu[]>
  userMenu: Nullable<UserMenu[]>
  userPermissions: Nullable<string[]>
  userPermissionMap: Map<string, boolean>
}

const SETUP_ROUTES_TYPE = appConfig.routesHandlerOptions.setupRoutesType

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
    roleMenu: null,
    userMenu: null,
    userPermissions: null,
    // 用于O(1)判断权限
    userPermissionMap: new Map()
  }),
  getters: {},
  actions: {
    setupState() {
      this.token = db.get<string>('token') ?? this.token
      this.userInfo = db.get<UserInfo>('userInfo')

      if (SETUP_ROUTES_TYPE === 'all') {
        routesHandler.setupRoutes()
      }

      if (!this.token) return

      this.reloadCurrentPage(this.setUserMenu())
    },
    setUserMenu() {
      return Promise.all(
        SETUP_ROUTES_TYPE === 'roleMenu'
          ? [this.setUserPermissions(), this.setRoleMenu()]
          : [this.setUserPermissions()]
      ).then(() => {
        // 注册路由
        if (SETUP_ROUTES_TYPE !== 'all') {
          routesHandler.setupRoutes(this.roleMenu || [], this.userPermissionMap)
        }
      })
    },
    // 获取角色菜单
    setRoleMenu() {
      let http = getRoleMenu
      const roleMenu = db.get<UserMenu[]>('roleMenu')
      if (appConfig.storeConfig.userMenuStorage && roleMenu) {
        http = () => Promise.resolve({ data: roleMenu })
      }

      return http().then((res) => {
        if (!res.data.length) return res

        if (appConfig.storeConfig.userMenuStorage && !roleMenu) {
          db.set('roleMenu', res.data)
        }

        this.roleMenu = res.data as RoleMenu[]

        return res
      })
    },
    // 设置用户权限
    setUserPermissions() {
      let http = getUserPermissions
      const userPermissions = db.get<string[]>('userPermissions')
      if (appConfig.storeConfig.userPermissionsStorage && userPermissions) {
        http = () => Promise.resolve({ data: userPermissions })
      }

      return http().then((res) => {
        if (appConfig.storeConfig.userPermissionsStorage && !userPermissions) {
          db.set('userPermissions', res.data)
        }
        this.userPermissions = res.data
        this.generaterPermissionMap()
        return res
      })
    },
    async loginHandler(data: { token: string; user: UserInfo }) {
      this.setToken(data.token, {
        expires: appConfig.serviceTokenConfig.expires
      })
      this.setUserInfo(data.user)

      await this.setUserMenu()

      return router.push({
        name: appConfig.routeMainName
      })
    },
    // 登录
    async login(params: UserLoginParams) {
      const res = await userLogin(params)
      await this.loginHandler(res.data)
      return res
    },
    // 退出登录/身份验证失败
    logout() {
      db.removeKeys('token', 'userInfo', 'userPermissions', 'roleMenu')

      router.push({
        name: appConfig.routeLoginName
      })

      location.reload()
    },
    setState(state: Partial<UserState>, dbOptions?: StorageSetOptions) {
      this.$patch(state)
      if (dbOptions) {
        db.setData(state, dbOptions)
      }
    },
    setToken(token: string, dbOptions?: StorageSetOptions) {
      this.token = token
      db.set('token', this.token, dbOptions)
    },
    setUserInfo(userInfo: UserInfo, dbOptions?: StorageSetOptions) {
      this.userInfo = userInfo
      db.set('userInfo', this.userInfo, dbOptions)
    },
    // 生成PermissionMap
    generaterPermissionMap() {
      const map = new Map<string, boolean>()
      if (this.userPermissions) {
        for (const permission of this.userPermissions) {
          map.set(permission, true)
        }
      }
      this.userPermissionMap = map
    },
    // 校验权限
    permissionAuth(permission: string) {
      return !!this.userPermissionMap.get(permission)
    },
    // 重载当前页
    async reloadCurrentPage(promise: Promise<any>) {
      const routerStore = useRouterStore()
      routerStore.setState({
        loading: true,
        closeLoading: false
      })

      await promise

      await router.replace({
        ...getRouteLocationRaw(appConfig.routerHistory),
        force: true
      })

      routerStore.setState({
        loading: false,
        closeLoading: true
      })
    }
  }
})

// 根据路由模式从当前 URL 中解析出 path、query、hash
function getRouteLocationRaw(mode: 'Hash' | 'HTML5') {
  const { location } = window
  let path = ''
  let query: Record<string, string | string[]> = {}
  let hash = ''

  if (mode === 'Hash') {
    const hashContent = location.hash.substring(1)
    const [pathAndQuery, hashFragment = ''] = hashContent.split('#', 2)
    const [pathPart, queryString] = pathAndQuery.split('?', 2)

    path = pathPart || '/'
    query = queryString ? parseQuery(queryString) : {}
    hash = hashFragment ? '#' + hashFragment : ''
  } else {
    path = location.pathname || '/'
    query = location.search ? parseQuery(location.search.substring(1)) : {}
    hash = location.hash
  }

  return { path, query, hash }
}

// 将查询字符串解析为对象
function parseQuery(queryString?: string) {
  if (!queryString) return {}

  const params = new URLSearchParams(queryString)
  const query: Record<string, string | string[]> = {}

  for (const [key, value] of params.entries()) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      const cur = query[key] as string | string[]
      query[key] = Array.isArray(cur) ? [...cur, value] : [cur, value]
    } else {
      query[key] = value
    }
  }

  return query
}
