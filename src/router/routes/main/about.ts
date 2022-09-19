import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'about',
  name: 'About',
  meta: {
    title: '关于',
    icon: 'iconfont-gengduo',
    sort: 2
  },
  component: () => import('@/views/main/about/about.vue')
} as RouteRecordRaw
