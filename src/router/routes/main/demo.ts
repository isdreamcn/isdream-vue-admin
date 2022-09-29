import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'demo',
  name: 'Demo',
  redirect: {
    name: 'DemoShowLoading'
  },
  meta: {
    title: '功能',
    icon: 'icon-files',
    sort: 5
  },
  children: [
    {
      path: 'show-loading',
      name: 'DemoShowLoading',
      meta: {
        title: '加载动画',
        icon: 'icon-loading'
      },
      component: () => import('@/views/main/demo/showLoading/showLoading.vue')
    }
  ]
} as RouteRecordRaw
