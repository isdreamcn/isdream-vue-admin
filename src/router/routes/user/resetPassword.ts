import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'resetPassword',
  name: 'resetPassword',
  meta: {
    needRouteHistory: false
  },
  component: () => import('@/views/user/resetPassword/resetPassword.vue')
} as RouteRecordRaw
