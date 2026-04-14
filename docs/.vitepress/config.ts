import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'isdream-vue-admin',
  description: '基于 Vue 3 的中后台管理系统模板',
  lang: 'zh-CN',
  base: '/isdream-vue-admin/',

  themeConfig: {
    search: {
      provider: 'local'
    },

    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/table' },
      { text: '常见问题', link: '/faq' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开发指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '目录结构', link: '/guide/directory-structure' },
            { text: '权限系统', link: '/guide/permission' },
            { text: '布局系统', link: '/guide/layout' },
            { text: '主题配置', link: '/guide/theme' },
            { text: 'Mock 数据', link: '/guide/mock' },
            { text: '用户认证', link: '/guide/authentication' }
          ]
        }
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'Table 表格', link: '/components/table' },
            { text: 'Form 表单', link: '/components/form' },
            { text: 'FormDialog 弹窗表单', link: '/components/form-dialog' },
            { text: 'Upload 上传', link: '/components/upload' },
            { text: 'Editor 富文本', link: '/components/editor' },
            { text: 'Markdown 编辑器', link: '/components/markdown' },
            { text: 'Chart 图表', link: '/components/chart' },
            { text: 'SearchTree 搜索树', link: '/components/search-tree' },
            { text: 'TreeSelect 树选择器', link: '/components/tree-select' },
            {
              text: 'ColorPicker 颜色选择器',
              link: '/components/color-picker'
            },
            { text: 'Icon 图标', link: '/components/icon' },
            {
              text: 'DeleteButton 删除按钮',
              link: '/components/delete-button'
            },
            { text: 'Loading 加载', link: '/components/loading' },
            {
              text: 'ActionButton 操作按钮',
              link: '/components/action-button'
            },
            { text: 'Lottie 动画', link: '/components/lottie' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/isdreamcn/isdream-vue-admin' }
    ],

    editLink: {
      pattern:
        'https://github.com/isdreamcn/isdream-vue-admin/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright 2022-present isdream'
    }
  }
})
