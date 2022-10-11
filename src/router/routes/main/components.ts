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
      path: 'table',
      meta: {
        title: '表格'
      },
      component: () => import('@/views/main/components/table/table.vue')
    },
    {
      path: 'form',
      meta: {
        title: '表单'
      },
      component: () => import('@/views/main/components/form/form.vue')
    },
    {
      path: 'formDialog',
      meta: {
        title: '表单对话框'
      },
      component: () =>
        import('@/views/main/components/formDialog/formDialog.vue')
    }
  ]
} as RouteRecordRaw
