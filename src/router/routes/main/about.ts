import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'about',
  name: 'About',
  meta: {
    title: '关于',
    icon: 'iconfont-gengduo'
  },
  component: () => import('@/views/main/about/about.vue')
} as RouteRecordRaw
