import 'element-plus/es/components/message/style/css'
import { AppUsePlugin } from '../types'

import * as components from './components'
import * as icons from './icons'

const useIcons: AppUsePlugin = (app) => {
  // icons
  for (const [key, icon] of Object.entries(icons)) {
    app.component('Icon' + icon.name || key, icon)
  }
}

export const useComponents: AppUsePlugin = (app) => {
  // components
  for (const [key, component] of Object.entries(components)) {
    if (typeof component.install === 'function') {
      app.use(component)
    } else {
      app.component(component.name || key, component)
    }
  }

  useIcons(app)
}

// 组件全部导入、用于开发环境
export const useComponentsAll: AppUsePlugin = (app) => {
  import('element-plus/dist/index.css')
  import('element-plus').then((ElementPlus) => {
    app.use(ElementPlus)
  })

  // m-components
  import('@/components').then((MComponents: Record<string, any>) => {
    for (const component of Object.values(MComponents)) {
      if (typeof component?.install === 'function') {
        app.use(component)
      }
    }
  })

  useIcons(app)
}

export type GlobalComponents = keyof typeof components
