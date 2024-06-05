import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'example',
  meta: {
    title: '使用例子',
    icon: 'icon-Guide',
    sort: 5,
    topMenu: true
  },
  children: [
    {
      path: 'user',
      meta: {
        title: '用户管理'
      },
      component: () =>
        import('@/views/main/example/userManagement/userManagement.vue')
    }
  ]
} as RouteRecordRaw
