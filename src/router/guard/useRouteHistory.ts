import type { Router } from 'vue-router'
import { useRouterStore } from '@/store'
export const useRouteHistory = (router: Router) => {
  const routerStore = useRouterStore()

  router.beforeEach((to) => {
    if (!to.name) {
      return
    }
    const _name = String(to.name)
    routerStore.addRouteHistory(_name, {
      name: _name,
      meta: to.meta
    })
  })
}
