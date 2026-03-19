import type { Router } from 'vue-router'
import { useRouterStore } from '@/store'

export const useRouteHistory = (router: Router) => {
  router.afterEach((to) => {
    if (!to.meta.needRouteHistory) {
      return
    }
    useRouterStore().addRouteHistory({
      path: to.fullPath,
      meta: {
        title: to.fullPath,
        ...to.meta
      }
    })
  })
}
