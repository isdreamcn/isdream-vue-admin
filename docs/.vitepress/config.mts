import { defineConfig, type DefaultTheme } from 'vitepress'

import pkg from '../../package.json'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'isdream Admin',
  description: '开箱即用的前端框架',

  /* prettier-ignore */
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'isdream Admin | 开箱即用的前端框架' }],
    ['meta', { property: 'og:site_name', content: 'isdream Admin' }],
    ['meta', { property: 'keywords', content: 'isdream,isdream-vue-admin,vue-admin,vue3,前端,免费开源,中后台模版' }],
    ['meta', { property: 'description', content: 'isdream-vue-admin 是一个免费开源的中后台模版, 使用了最新的Vue3、Vite3、Pinia2、Element-Plus、TypeScript等主流技术开发' }],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: '/logo.svg', width: 24, height: 24 },

    nav: nav(),

    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/isdreamcn/isdream-vue-admin' }
    ],

    editLink: {
      pattern: 'https://github.com/isdreamcn/isdream-vue-admin/edit/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2022-${new Date().getFullYear()} isdream.cn`
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '文档',
      items: [
        { text: '指南', link: '/guide/what-is', activeMatch: '/guide/' },
        { text: '组件', link: '/components/' }
      ]
    },
    {
      text: pkg.version,
      items: [
        {
          text: '更新日志',
          link: 'https://github.com/isdreamcn/isdream-vue-admin/releases'
        }
      ]
    },
    {
      text: '相关链接',
      items: [
        {
          text: '预览',
          link: 'https://v3t.isdream.cn/'
        },
        {
          text: '源码',
          link: 'https://github.com/isdreamcn/isdream-vue-admin'
        },
        {
          text: '文档源码',
          link: 'https://github.com/isdreamcn/isdream-vue-admin/tree/docs'
        },
        {
          text: 'Blog',
          link: 'https://isdream.cn/'
        }
      ]
    }
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '简介',
      collapsed: false,
      items: [
        { text: '是什么', link: 'what-is' },
        { text: '快速开始', link: 'getting-started' }
      ]
    }
  ]
}
