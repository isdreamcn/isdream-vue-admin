import type { StorageSetOptions } from '@/storage'
import { defineStore } from 'pinia'
import db from '@/storage'

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
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
    userMenu: null
  }),
  getters: {},
  actions: {
    setupState() {
      const token = db.get<string>('token')
      const userInfo = db.get<UserInfo>('userInfo')
      const userMenu = db.get<UserMenu[]>('userMenu')
      this.$patch({
        token: token ?? '',
        userInfo,
        userMenu
      })
    },
    // 退出登录
    layout() {
      db.removeKeys('token', 'userInfo', 'userMenu')
      this.$patch({
        token: '',
        userInfo: null,
        userMenu: null
      })
    },
    setState(state: Partial<UserState>, dbOptions?: StorageSetOptions) {
      this.$patch(state)
      db.setData(state, dbOptions)
    },
    setToken(token: string, dbOptions?: StorageSetOptions) {
      this.token = token
      db.set('token', this.token, dbOptions)
    }
  }
})
