import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'components',
  meta: {
    title: '组件',
    icon: 'icon-menu',
    sort: 4,
    topMenu: true
  },
  children: [
    {
      path: 'icon',
      meta: {
        title: 'icon图标'
      },
      component: () => import('@/views/examples/components/icon/icon.vue')
    },
    {
      path: 'colorPicker',
      meta: {
        title: '颜色选择器'
      },
      component: () =>
        import('@/views/examples/components/colorPicker/colorPicker.vue')
    },
    {
      path: 'table',
      meta: {
        title: '表格'
      },
      component: () => import('@/views/examples/components/table/table.vue')
    },
    {
      path: 'form',
      meta: {
        title: '表单'
      },
      component: () => import('@/views/examples/components/form/form.vue')
    },
    {
      path: 'formDialog',
      meta: {
        title: '表单对话框'
      },
      component: () =>
        import('@/views/examples/components/formDialog/formDialog.vue')
    },
    {
      path: 'deleteButton',
      meta: {
        title: '批量删除按钮'
      },
      component: () =>
        import('@/views/examples/components/deleteButton/deleteButton.vue')
    },
    {
      path: 'a',
      meta: {
        title: 'a按钮'
      },
      component: () => import('@/views/examples/components/a/a.vue')
    },
    {
      path: 'editor',
      meta: {
        title: 'tinymce富文本'
      },
      component: () => import('@/views/examples/components/editor/editor.vue')
    },
    {
      path: 'markdown',
      meta: {
        title: 'markdown'
      },
      component: () =>
        import('@/views/examples/components/markdown/markdown.vue')
    },
    {
      path: 'upload',
      meta: {
        title: 'upload'
      },
      component: () => import('@/views/examples/components/upload/upload.vue')
    },
    {
      path: 'chart',
      meta: {
        title: 'echarts图表'
      },
      component: () => import('@/views/examples/components/chart/chart.vue')
    },
    {
      path: 'lottie',
      meta: {
        title: 'lottie动画'
      },
      component: () => import('@/views/examples/components/lottie/lottie.vue')
    },
    {
      path: 'loading',
      meta: {
        title: 'loading'
      },
      component: () => import('@/views/examples/components/loading/loading.vue')
    },
    {
      path: 'searchTree',
      meta: {
        title: 'searchTree(可搜索树)'
      },
      component: () =>
        import('@/views/examples/components/searchTree/searchTree.vue')
    },
    {
      path: 'treeSelect',
      meta: {
        title: 'treeSelect(下拉树)'
      },
      component: () =>
        import('@/views/examples/components/treeSelect/treeSelect.vue')
    }
  ]
} as RouteRecordRaw
