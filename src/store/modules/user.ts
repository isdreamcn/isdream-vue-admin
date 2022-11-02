import type { StorageSetOptions } from '@/storage'
import type { UserLoginParams } from '@/api/user/types/loginTypes'
import { defineStore } from 'pinia'
import db from '@/storage'
import appConfig from '@/config'
import router, { routesHandler } from '@/router'
import { userLogin, getUserMenu, getUserPermissions } from '@/api/user/login'
import { useRouteMainPath, useRouterStore } from './router'

export interface UserMenu {
  title: string
  // 唯一key，多级路由地址拼接，/开头
  path: string
  icon?: string
  link?: string
  children?: UserMenu[]
}

export interface UserInfo {
  id: number
  username: string
  realname?: string
  email: string
  avatar?: string
}

interface UserState {
  token: string
  userInfo: Nullable<UserInfo>
  userMenu: Nullable<UserMenu[]>
  userPermissions: Nullable<string[]>
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
    userMenu: null,
    userPermissions: []
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
      } else if (this.token) {
        // 重新获取用户菜单及权限
        setTimeout(() => {
          const routerStore = useRouterStore()
          routerStore.setState({
            loading: true,
            needLoading: false
          })
          // 菜单
          getUserMenu().then((res) => {
            routesHandler.useRoleMenu(res.data)
            // 重载当前页
            router
              .push(location.hash ? location.hash.slice(1) : location.pathname)
              .then(() => {
                routerStore.setState({
                  loading: false
                })
              })
          })
          // 权限
          getUserPermissions().then((res) => {
            this.userPermissions = res.data
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
            userPermissions: data.permissions
          },
          {
            expires: appConfig.serviceTokenConfig.expires
          }
        )

        // 注册路由
        routesHandler.useRoleMenu(data.menu)
        router.push(useRouteMainPath().value)
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
    }
  }
})
