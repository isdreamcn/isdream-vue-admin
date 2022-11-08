import type { RouteRecordRaw } from 'vue-router'
import appConfig from '@/config'

export default {
  path: 'login',
  name: appConfig.routeLoginName,
  component: () => import('@/views/user/login/login.vue')
} as RouteRecordRaw
