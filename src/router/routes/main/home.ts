import config from '@/config'

import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'home',
  name: config.mainName,
  meta: {
    title: '首页',
    icon: 'IconHomeFilled',
    sort: 1
  },
  component: () => import('@/views/main/home/home.vue')
} as RouteRecordRaw
