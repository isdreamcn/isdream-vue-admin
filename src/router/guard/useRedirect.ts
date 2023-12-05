import type { Router } from 'vue-router'
import { routesHandler } from '@/router'
import { useRouteMainPath } from '@/store'
import { appConfig } from '@/config'

export const useRedirect = (router: Router) => {
  router.beforeEach((to) => {
    if (to.name === appConfig.routeMainName) {
      return useRouteMainPath().value
    }

    const path = routesHandler.getRouteByPath(to.path)?.redirectNode?.path
    if (path) {
      return path
    }
  })
}
