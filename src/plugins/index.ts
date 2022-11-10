import type { AppUsePlugin } from './types'
import { usePinia } from './pinia'
import { useVueRouter } from './vueRouter'
import { useDirectives } from './directives'
import { useComponents } from './components'
import { useViewer } from './viewer'
import { useDayjs } from './dayjs'

export const setupAppPlugins: AppUsePlugin = (app) => {
  usePinia(app)
  // v-viewer
  useViewer(app)
  // dayjs
  useDayjs()
  // vue-router
  useVueRouter(app)
  // 全局指令
  useDirectives(app)
  // 全局组件
  useComponents(app)
}

// types
export * from './types'
