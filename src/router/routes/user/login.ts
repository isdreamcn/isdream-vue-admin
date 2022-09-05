import config from '@/config'

import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'login',
  name: config.loginName,
  component: () => import('@/views/user/login/login.vue')
} as RouteRecordRaw
