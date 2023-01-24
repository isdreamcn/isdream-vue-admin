import type { RouteRecordRaw } from 'vue-router'
import appConfig from '@/config'

export default {
  path: 'login',
  name: appConfig.routeLoginName,
  meta: {
    needRouteHistory: false
  },
  component: () => import('@/views/user/login/login.vue')
} as RouteRecordRaw
