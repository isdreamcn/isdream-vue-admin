import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'components',
  meta: {
    title: '组件',
    icon: 'icon-menu',
    sort: 4
  },
  children: [
    {
      path: 'color-pick',
      name: 'ColorPick',
      meta: {
        title: '颜色选择器',
        sort: 1,
        icon: 'icon-ticket'
      },
      component: () => import('@/views/main/components/colorPick/colorPick.vue')
    }
  ]
} as RouteRecordRaw
