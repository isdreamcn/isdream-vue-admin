import type { Router } from 'vue-router'
import { appConfig } from '@/config'
import { useUserStore } from '@/store'

export const useHasToken = (router: Router) => {
  const userStore = useUserStore()
  router.beforeEach((to) => {
    if (!(to.meta.needToken ?? appConfig.defaultRouteMeta.needToken)) {
      return
    }
    const token = userStore.token
    const userPermissions = userStore.userPermissions
    if (to.name !== appConfig.routeLoginName) {
      if (!token) {
        return {
          name: appConfig.routeLoginName
        }
      } else if (!userPermissions) {
        return false
      }
    }
  })
}
