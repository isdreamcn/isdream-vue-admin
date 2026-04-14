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

    nav: [],

    sidebar: {},

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
