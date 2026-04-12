import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'register',
  name: 'register',
  meta: {
    needRouteHistory: false
  },
  component: () => import('@/views/user/register/register.vue')
} as RouteRecordRaw
