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
      { text: '指南', link: '/guide/getting-started' }
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
