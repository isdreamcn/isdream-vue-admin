import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'demo',
  name: 'Demo',
  redirect: {
    name: 'DemoShowLoading'
  },
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
        icon: 'icon-loading'
      },
      component: () => import('@/views/main/demo/showLoading/showLoading.vue')
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
      path: 'menu',
      name: 'Menu',
      redirect: {
        name: 'Menu1'
      },
      meta: {
        title: '多级菜单',
        icon: 'icon-menu',
        sort: 4
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
          redirect: {
            name: 'Menu11'
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
                import('@/views/main/menu/menu1/menu11/menu11.vue')
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
          component: () => import('@/views/main/menu/menu2/menu2.vue')
        }
      ]
    }
  ]
} as RouteRecordRaw
