import config from '@/config'

import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'home',
  name: config.mainName,
  component: () => import('@/views/main/home/home.vue')
} as RouteRecordRaw
