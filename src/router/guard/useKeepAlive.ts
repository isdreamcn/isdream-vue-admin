import type { Router } from 'vue-router'
import appConfig from '@/config'
import { useRouterStore } from '@/store'

export const useKeepAlive = (router: Router) => {
  const routerStore = useRouterStore()
  router.beforeEach((to) => {
    if (to.meta.keepAlive ?? appConfig.defaultRouteMeta.keepAlive) {
      const matched = to.matched
      const len = matched.length - 1
      for (let i = 0; i < len; i++) {
        const key = matched[i].name
        const name = matched[i + 1].name
        if (key && name) {
          routerStore.addAlive(String(key), String(name))
        }
      }
    }
  })
}
