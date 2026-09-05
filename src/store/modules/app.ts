import type { LayoutKey } from '@/views/layout/config'
import { computed } from 'vue'
import { defineStore } from 'pinia'
import db, { StorageSetOptions } from '@/storage'
import { mergeObjDeep } from '@/utils'
import { setCssVariable, applyThemeClass } from '@/hooks'

type Theme = 'light' | 'dark'

export interface AppSetting {
  colorPrimary: string
  layout: LayoutKey
  showLogo: boolean
  menu: {
    // 合并展示全部菜单
    mergeTopMenu: boolean
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
    mergeTopMenu: true,
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
    /** 应用启动时从 storage 恢复主题与设置，并应用到页面 */
    setupState() {
      const theme = db.get<string>('theme')
      const appSetting = db.get<AppSetting>('appSetting')
      this.$patch({
        theme: theme === 'dark' || theme === 'light' ? theme : this.theme,
        appSetting: appSetting ?? this.appSetting
      })
      this.setRootCss()
    },
    /** 将主题色与菜单配色写入根元素 CSS 变量，并切换 dark/light class */
    setRootCss() {
      const { colorPrimary, menu } = this.appSetting
      applyThemeClass()
      setCssVariable('--el-color-primary', colorPrimary)
      setCssVariable('--bg-color', menu.backgroundColor)
      setCssVariable('--text-color', menu.textColor)
      setCssVariable('--hover-bg-color', menu.hoverBackgroundColor)
    },
    /** 批量更新状态并写入 storage */
    setState(state: Partial<AppState>, dbOptions?: StorageSetOptions) {
      this.$patch(state)
      db.setData(state, dbOptions)
    },
    /** 深度合并部分设置，持久化并刷新页面样式 */
    setAppSetting(appSetting: AppSettingPartial) {
      this.$patch({
        appSetting: mergeObjDeep(this.appSetting, appSetting)
      })

      db.set('appSetting', this.appSetting)
      this.setRootCss()
    },
    /** 恢复默认设置，持久化并刷新页面样式 */
    resetAppSetting() {
      this.appSetting = useAppSettingDefault()
      db.set('appSetting', this.appSetting)
      this.setRootCss()
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
