import type { Router } from 'vue-router'
import { useRouterStore } from '@/store'
import { appConfig } from '@/config'

export const useRouteHistory = (router: Router) => {
  const routerStore = useRouterStore()

  router.afterEach((to) => {
    if (
      !(to.meta.needRouteHistory ?? appConfig.defaultRouteMeta.needRouteHistory)
    ) {
      return
    }
    routerStore.addRouteHistory({
      path: to.fullPath,
      meta: {
        title: to.fullPath,
        ...to.meta
      }
    })
  })
}
