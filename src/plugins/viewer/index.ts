import type { AppUsePlugin } from '../types'
import VueViewer from 'v-viewer'

export const useViewer: AppUsePlugin = (app) => {
  app.use(VueViewer, {
    defaultOptions: {
      zIndex: 9999
    }
  })
}
