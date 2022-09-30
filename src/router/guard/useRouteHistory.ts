import type { Router } from 'vue-router'
import { useRouterStore } from '@/store'
export const useRouteHistory = (router: Router) => {
  const routerStore = useRouterStore()

  router.beforeEach((to) => {
    routerStore.addRouteHistory(to.path, {
      pathKey: to.path,
      meta: {
        title: to.path,
        ...to.meta
      }
    })
  })
}
