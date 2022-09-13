import type { RouteLocationNormalized } from 'vue-router'
import appConfig from '@/config'
import db from '@/storage'

export const useHasToken = (to: RouteLocationNormalized) => {
  const token = db.get('token')
  return () => {
    if (!token && to.name !== appConfig.loginName) {
      return {
        name: appConfig.loginName
      }
    }
  }
}
