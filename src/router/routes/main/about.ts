import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'about',
  name: 'About',
  meta: {
    title: '关于',
    icon: 'icon-cpu',
    sort: 2
  },
  component: () => import('@/views/main/about/about.vue')
} as RouteRecordRaw
