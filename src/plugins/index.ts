import type { AppUsePlugin } from './types'
import { usePinia } from './pinia'
import { useVueRouter } from './vueRouter'
import { useDirectives } from './directives'
import { useGlobalProperties } from './globalProperties'
import { useComponents, useComponentsAll } from './components'
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
  // 全局属性
  useGlobalProperties(app)
  // 全局组件
  if (import.meta.env.DEV) {
    useComponentsAll(app)
  } else {
    useComponents(app)
  }
}

// types
export * from './types'
