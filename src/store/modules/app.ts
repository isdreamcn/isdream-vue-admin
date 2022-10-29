import type { StorageSetOptions } from '@/storage'
import type { LayoutKeys } from '@/views/layout/config'
import { computed } from 'vue'
import { defineStore } from 'pinia'
import db from '@/storage'
import { mergeObjDeep } from '@/utils'

type Theme = 'light' | 'dark'

export interface AppSetting {
  colorPrimary: string
  layout: LayoutKeys
  showLogo: boolean
  menu: {
    // 折叠
    collapsed: boolean
    mode: 'horizontal' | 'vertical'
    backgroundColor: string
    textColor: string
    hoverBackgroundColor: string
  }
  breadcrumb: {
    show: boolean
    icon: boolean
  }
  routeHistory: {
    show: boolean
    actions: boolean
  }
  footer: {
    show: boolean
  }
}

const useAppSettingDefault = (): AppSetting => ({
  colorPrimary: '#409EFF',
  layout: 'mainLayout',
  showLogo: true,
  menu: {
    collapsed: false,
    mode: 'vertical',
    backgroundColor: '#ffffff',
    textColor: '#303133',
    hoverBackgroundColor: '#ecf5ff'
  },
  breadcrumb: {
    show: true,
    icon: true
  },
  routeHistory: {
    show: true,
    actions: true
  },
  footer: {
    show: true
  }
})

export type AppSettingPartial = PartialDeep<AppSetting>

interface AppState {
  theme: Theme
  appSetting: AppSetting
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: 'light',
    appSetting: useAppSettingDefault()
  }),
  getters: {},
  actions: {
    setupState() {
      const theme = db.get<string>('theme')
      const appSetting = db.get<AppSetting>('appSetting')
      this.$patch({
        theme: theme === 'dark' ? 'dark' : 'light',
        appSetting: appSetting ?? this.appSetting
      })
    },
    setState(state: Partial<AppState>, dbOptions?: StorageSetOptions) {
      this.$patch(state)
      db.setData(state, dbOptions)
    },
    setAppSetting(appSetting: AppSettingPartial) {
      this.$patch({
        appSetting: mergeObjDeep(this.appSetting, appSetting)
      })

      db.set('appSetting', this.appSetting)
    },
    resetAppSetting() {
      this.appSetting = useAppSettingDefault()
      db.set('appSetting', this.appSetting)
    }
  }
})

export const useAppSetting = () => {
  const appStore = useAppStore()
  const appSetting = computed(() => appStore.appSetting)

  const appTheme = computed(() => appStore.theme)
  const appIsDark = computed(() => appStore.theme === 'dark')

  return {
    appSetting,
    appTheme,
    appIsDark
  }
}
