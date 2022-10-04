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
      path: 'color-picker',
      name: 'ColorPicker',
      meta: {
        title: '颜色选择器',
        sort: 1,
        icon: 'icon-ticket'
      },
      component: () =>
        import('@/views/main/components/colorPicker/colorPicker.vue')
    }
  ]
} as RouteRecordRaw
