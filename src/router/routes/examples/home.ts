import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'home',
  meta: {
    title: '首页',
    icon: 'IconHomeFilled',
    sort: 1
  },
  component: () => import('@/views/examples/home/home.vue')
} as RouteRecordRaw
