import type { StorageSetOptions } from '@/storage'
import { defineStore } from 'pinia'
import db from '@/storage'
import appConfig from '@/config'
import router, { routesHandler } from '@/router'
import { useRouterStore } from './router'
import {
  UserLoginParams,
  userLogin,
  getUserMenu,
  getUserPermissions
} from '@/api/user/login'

export interface UserMenu {
  title: string
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
  userMenu: Nullable<UserMenu[]>
  userPermissions: Nullable<string[]>
  userPermissionMap: Map<string, boolean>
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
    userMenu: null,
    userPermissions: [],
    // 用于O(1)判断权限
    userPermissionMap: new Map()
  }),
  getters: {},
  actions: {
    setupState() {
      this.token = db.get<string>('token') ?? this.token
      this.userInfo = db.get<UserInfo>('userInfo')
      // Storage 存储了userMenu、userPermissions
      if (appConfig.storeConfig.userStorage) {
        this.userMenu = db.get<UserMenu[]>('userMenu')
        this.userPermissions = db.get<string[]>('userPermissions')
        this.generaterPermissionMap()
      } else if (this.token) {
        // 重新获取用户菜单及权限
        setTimeout(() => {
          const routerStore = useRouterStore()
          routerStore.setState({
            loading: true,
            closeLoading: false
          })
          // 菜单
          getUserMenu().then((res) => {
            routesHandler.useRoleMenu(res.data)
            // 重载当前页
            router
              .push(location.hash ? location.hash.slice(1) : location.pathname)
              .then(() => {
                routerStore.setState({
                  loading: false,
                  closeLoading: true
                })
              })
          })
          // 权限
          getUserPermissions().then((res) => {
            this.userPermissions = res.data
            this.generaterPermissionMap()
          })
        })
      }
    },
    // 登录
    login(params: UserLoginParams) {
      return userLogin(params).then(({ data }) => {
        this.setToken(data.token)
        this.setUserInfo(data.user)
        this.setState(
          {
            userPermissions: []
          },
          {
            expires: appConfig.serviceTokenConfig.expires
          }
        )
        this.generaterPermissionMap()

        // 注册路由
        routesHandler.useRoleMenu([])
        router.push({
          name: appConfig.routeMainName
        })
      })
    },
    // 退出登录
    layout() {
      db.removeKeys('token', 'userInfo', 'userMenu', 'userPermissions')
      this.$patch({
        token: '',
        userInfo: null,
        userMenu: null,
        userPermissions: null
      })
    },
    setState(state: Partial<UserState>, dbOptions?: StorageSetOptions) {
      this.$patch(state)
      if (appConfig.storeConfig.userStorage) {
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
    }
  }
})
