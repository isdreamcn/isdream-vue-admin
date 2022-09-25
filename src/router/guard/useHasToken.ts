import type { Router } from 'vue-router'
import appConfig from '@/config'
import { useUserStore } from '@/store'

export const useHasToken = (router: Router) => {
  const userStore = useUserStore()
  router.beforeEach((to) => {
    const token = userStore.token
    if (!token && to.name !== appConfig.loginName) {
      return {
        name: appConfig.loginName
      }
    }
  })
}
