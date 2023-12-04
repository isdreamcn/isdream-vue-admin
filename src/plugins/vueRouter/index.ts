import type { AppUsePlugin } from '../types'
import router from '@/router'
import { useRouterGuard } from '@/router/guard'

export const useVueRouter: AppUsePlugin = (app) => {
  app.use(router)

  useRouterGuard(router)
}
