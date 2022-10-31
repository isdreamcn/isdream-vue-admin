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
    },
    {
      path: 'deleteButton',
      meta: {
        title: '批量删除按钮'
      },
      component: () =>
        import('@/views/main/components/deleteButton/deleteButton.vue')
    },
    {
      path: 'a',
      meta: {
        title: 'a按钮'
      },
      component: () => import('@/views/main/components/a/a.vue')
    },
    {
      path: 'editor',
      meta: {
        title: 'tinymce富文本'
      },
      component: () => import('@/views/main/components/editor/editor.vue')
    },
    {
      path: 'markdown',
      meta: {
        title: 'markdown'
      },
      component: () => import('@/views/main/components/markdown/markdown.vue')
    },
    {
      path: 'upload',
      meta: {
        title: 'upload'
      },
      component: () => import('@/views/main/components/upload/upload.vue')
    },
    {
      path: 'chart',
      meta: {
        title: '图表'
      },
      component: () => import('@/views/main/components/chart/chart.vue')
    }
  ]
} as RouteRecordRaw
