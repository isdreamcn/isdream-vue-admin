import type { RouteRecordRaw } from 'vue-router'
import config from '@/config'

export default {
  path: 'login',
  name: config.loginName,
  meta: {
    verifyAuth: false
  },
  component: () => import('@/views/user/login/login.vue')
} as RouteRecordRaw
