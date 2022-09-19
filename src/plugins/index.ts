import type { AppUsePlugin } from './types'
import { usePinia } from './pinia'
import { useVueRouter } from './vueRouter'
import { useDirectives } from './directives'
import { useComponents } from './components'

export const setupAppPlugins: AppUsePlugin = (app) => {
  usePinia(app)
  useVueRouter(app)
  // 全局指令
  useDirectives(app)
  // 全局组件
  useComponents(app)
}
