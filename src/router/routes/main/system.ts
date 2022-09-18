import type { RouteRecordRaw } from 'vue-router'

export default {
  path: '/system',
  name: 'System',
  redirect: {
    name: 'SystemUser'
  },
  meta: {
    title: '系统设置',
    icon: 'icon-setting'
  },
  children: [
    {
      path: 'user',
      name: 'SystemUser',
      meta: {
        title: '用户管理'
      },
      component: () => import('@/views/main/system/user/user.vue')
    }
  ]
} as RouteRecordRaw
