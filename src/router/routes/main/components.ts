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
      meta: {
        title: '颜色选择器'
      },
      component: () =>
        import('@/views/main/components/colorPicker/colorPicker.vue')
    },
    {
      path: 'tabel',
      meta: {
        title: '表格'
      },
      component: () => import('@/views/main/components/tabel/tabel.vue')
    }
  ]
} as RouteRecordRaw
