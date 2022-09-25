import type { StorageSetOptions } from '@/storage'
import { defineStore } from 'pinia'
import db from '@/storage'
import { mergeObjDeep } from '@/utils'

type Theme = 'light' | 'dark'

interface AppSetting {
  menu: {
    // 折叠
    collapsed: boolean
  }
}

interface AppState {
  theme: Theme
  appSetting: AppSetting
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: 'light',
    appSetting: {
      menu: {
        collapsed: false
      }
    }
  }),
  getters: {},
  actions: {
    setupState() {
      const theme = db.get<string>('theme')
      this.$patch({
        theme: theme === 'dark' ? 'dark' : 'light'
      })
    },
    setState(state: Partial<AppState>, dbOptions?: StorageSetOptions) {
      this.$patch(state)
      db.setData(state, dbOptions)
    },
    mergeAppSetting(appSetting: PartialDeep<AppSetting>) {
      this.appSetting = mergeObjDeep(this.appSetting, appSetting)
      db.set('appSetting', this.appSetting)
    }
  }
})
