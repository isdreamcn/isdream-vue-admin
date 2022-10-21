import type { Router } from 'vue-router'
import { useRouterStore } from '@/store'
export const useRouteHistory = (router: Router) => {
  const routerStore = useRouterStore()

  router.afterEach((to) => {
    // 前往的页面为404
    if (to.name === 'Error') {
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
