import { AppUsePlugin } from '../types'

import * as components from './components'
import * as icons from './icons'

export const useComponents: AppUsePlugin = (app) => {
  // components
  for (const [key, component] of Object.entries(components)) {
    if (typeof component.install === 'function') {
      app.use(component)
    } else {
      app.component(component.name || key, component)
    }
  }

  // icons
  for (const [key, icon] of Object.entries(icons)) {
    app.component('Icon' + icon.name || key, icon)
  }
}
