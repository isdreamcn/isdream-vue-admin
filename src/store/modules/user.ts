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

/** 侧边栏菜单节点（由路由/角色菜单生成，用于渲染导航） */
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
}

const SETUP_ROUTES_TYPE = appConfig.routesHandlerOptions.setupRoutesType

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
    roleMenu: null,
    userMenu: null,
    userPermissions: null
  }),
  getters: {
    /** 权限标识集合，用于 O(1) 判断权限 */
    userPermissionMap(state): Map<string, boolean> {
      const map = new Map<string, boolean>()
      if (state.userPermissions) {
        for (const permission of state.userPermissions) {
          map.set(permission, true)
        }
      }
      return map
    }
  },
  actions: {
    /**
     * 应用启动时恢复状态：从 storage 读取 token/用户信息，
     * all 模式直接注册全部路由；有 token 时拉取权限数据并重载当前页
     */
    async setupState() {
      this.token = db.get<string>('token') ?? this.token
      this.userInfo = db.get<UserInfo>('userInfo')

      if (SETUP_ROUTES_TYPE === 'all') {
        routesHandler.setupRoutes()
      }

      if (!this.token) return

      this.reloadCurrentPage(this.setUserMenu())
    },
    /**
     * 拉取权限数据并按权限模式注册路由
     * （roleMenu 模式额外拉取角色菜单，all 模式不注册，由 setupState 处理）
     * 调用方需 await 完成后再跳转路由（setupState / loginHandler）
     */
    setUserMenu() {
      return Promise.all(
        SETUP_ROUTES_TYPE === 'roleMenu'
          ? [this.setUserPermissions(), this.setRoleMenu()]
          : [this.setUserPermissions()]
      ).then(() => {
        if (SETUP_ROUTES_TYPE !== 'all') {
          routesHandler.setupRoutes(this.roleMenu || [], this.userPermissionMap)
        }
      })
    },
    /**
     * 获取角色菜单：开启 userMenuStorage 时优先读 storage 缓存，
     * 首次拉取成功后回写 storage
     */
    setRoleMenu() {
      let http = getRoleMenu
      const roleMenu = db.get<RoleMenu[]>('roleMenu')
      if (appConfig.storeConfig.userMenuStorage && roleMenu) {
        http = () => Promise.resolve({ data: roleMenu })
      }

      return http().then((res) => {
        if (!res.data?.length) return res

        if (appConfig.storeConfig.userMenuStorage && !roleMenu) {
          db.set('roleMenu', res.data)
        }

        this.roleMenu = res.data as RoleMenu[]

        return res
      })
    },
    /**
     * 获取用户权限标识：开启 userPermissionsStorage 时优先读 storage 缓存，
     * 首次拉取成功后回写 storage
     */
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
        return res
      })
    },
    /** 登录成功后的统一处理：持久化 token/用户信息、注册路由并跳转主页 */
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
    async login(params: UserLoginParams) {
      const res = await userLogin(params)
      await this.loginHandler(res.data)
      return res
    },
    /** 退出登录/身份验证失败：清空相关 storage，跳转登录页并刷新页面 */
    async logout() {
      db.removeKeys('token', 'userInfo', 'userPermissions', 'roleMenu')

      router.push({
        name: appConfig.routeLoginName
      })

      location.reload()
    },
    /** 批量更新状态，可选同步写入 storage */
    setState(state: Partial<UserState>, dbOptions?: StorageSetOptions) {
      this.$patch(state)
      if (dbOptions) {
        db.setData(state, dbOptions)
      }
    },
    /** 设置 token 并写入 storage */
    setToken(token: string, dbOptions?: StorageSetOptions) {
      this.token = token
      db.set('token', this.token, dbOptions)
    },
    /** 设置用户信息并写入 storage */
    setUserInfo(userInfo: UserInfo, dbOptions?: StorageSetOptions) {
      this.userInfo = userInfo
      db.set('userInfo', this.userInfo, dbOptions)
    },
    permissionAuth(permission: string) {
      return !!this.userPermissionMap.get(permission)
    },
    /**
     * 重载当前页：锁定全局 loading，等待权限/路由就绪后 replace 当前地址
     * （应用启动/刷新时由 setupState 调用）
     */
    async reloadCurrentPage(promise: Promise<any>) {
      const routerStore = useRouterStore()
      routerStore.setState({
        loading: true,
        closeLoading: false
      })

      try {
        await promise
        await router.replace({
          ...getRouteLocationRaw(appConfig.routerHistory),
          force: true
        })
      } finally {
        // 无论成功失败，都要恢复 loading 状态，否则会与 router.setState 的锁定逻辑
        // (loading && !closeLoading) 叠加，导致全局 loading 永久卡死
        routerStore.setState({
          loading: false,
          closeLoading: true
        })
      }
    }
  }
})

/** 根据路由模式从当前 URL 中解析出 path、query、hash */
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
    // HTML5 模式下 location.pathname 包含 base 前缀（如 /web/login），
    // 需要剥离掉 createWebHistory(base) 的 base，否则 router.replace 会再次拼接 base，
    // 导致刷新后路径累积重复的前缀（如 /web/web/login）。
    const base = (import.meta.env.VITE_BASE_URL || '').replace(/\/$/, '')
    const pathname = location.pathname || '/'
    path =
      base && pathname.startsWith(base)
        ? pathname.slice(base.length) || '/'
        : pathname
    query = location.search ? parseQuery(location.search.substring(1)) : {}
    hash = location.hash
  }

  return { path, query, hash }
}

/** 将查询字符串解析为对象，同名 key 出现多次时收集为数组 */
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
