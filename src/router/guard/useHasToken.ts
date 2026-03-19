import type { Router } from 'vue-router'
import { appConfig } from '@/config'
import { useUserStore } from '@/store'

export const useHasToken = (router: Router) => {
  router.beforeEach((to) => {
    if (!to.meta.needToken) {
      return
    }
    const token = useUserStore().token
    if (to.name !== appConfig.routeLoginName && !token) {
      return {
        name: appConfig.routeLoginName
      }
    }
  })
}
