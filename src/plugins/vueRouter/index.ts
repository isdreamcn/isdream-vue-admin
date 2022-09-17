import type { AppUsePlugin } from '../types'

import router from '@/router'
export const useVueRouter: AppUsePlugin = (app) => {
  app.use(router)
}
