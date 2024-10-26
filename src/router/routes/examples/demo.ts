import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'demo',
  name: 'Demo',
  meta: {
    title: '功能',
    icon: 'icon-files',
    sort: 5
  },
  children: [
    {
      path: 'show-loading',
      name: 'DemoShowLoading',
      meta: {
        title: '加载动画',
        icon: 'icon-loading',
        needLoading: true,
        keepAlive: false
      },
      component: () =>
        import('@/views/examples/demo/showLoading/showLoading.vue')
    },
    {
      path: 'link',
      name: 'Link',
      meta: {
        title: '外链',
        link: 'https://isdream.cn',
        icon: 'icon-link'
      }
    },
    {
      path: 'rem',
      meta: {
        title: 'rem布局',
        icon: 'icon-ScaleToOriginal'
      },
      component: () => import('@/views/layout/remLayout/remLayout.vue')
    },
    {
      path: 'menu',
      name: 'Menu',
      meta: {
        title: '多级菜单',
        icon: 'icon-ticket',
        sort: 4,
        topMenu: true
      },
      children: [
        {
          path: 'menu1',
          name: 'Menu1',
          meta: {
            title: 'Menu1',
            sort: 2,
            icon: 'icon-ticket'
          },
          children: [
            {
              path: 'menu11',
              name: 'Menu11',
              meta: {
                title: '深度缓存',
                icon: 'icon-ticket'
              },
              component: () =>
                import('@/views/examples/menu/menu1/menu11/menu11.vue')
            }
          ]
        },
        {
          path: 'menu2',
          name: 'Menu2',
          meta: {
            title: 'Menu2',
            sort: 1,
            icon: 'icon-ticket'
          },
          component: () => import('@/views/examples/menu/menu2/menu2.vue')
        }
      ]
    }
  ]
} as RouteRecordRaw
