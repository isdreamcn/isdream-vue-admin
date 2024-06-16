import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'tips',
  meta: {
    title: '小贴士',
    icon: 'IconHelp',
    sort: 3
  },
  component: () => import('@/views/examples/tips/tips.vue')
} as RouteRecordRaw
