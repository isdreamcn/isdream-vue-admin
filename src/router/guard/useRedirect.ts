import type { Router } from 'vue-router'
import { routesHandler } from '@/router'
import { useRouteMainPath } from '@/store'

export const useRedirect = (router: Router) => {
  router.beforeEach((to) => {
    if (to.path === '/') {
      return useRouteMainPath().value
    }
    const route = routesHandler.getRouteByPath(to.path)
    if (route?.children) {
      const path = routesHandler.getNotChildRoute(route.children)?.path
      if (path) {
        return path
      }
    }
  })
}
