import type { RouteRecordRaw } from 'vue-router'

export default {
  path: '/menu',
  name: 'Menu',
  redirect: {
    name: 'Menu1'
  },
  meta: {
    title: '多级菜单',
    icon: 'menu'
  },
  children: [
    {
      path: 'menu1',
      name: 'Menu1',
      meta: {
        title: 'Menu1'
      },
      redirect: {
        name: 'Menu11'
      },
      component: () => import('@/views/main/menu/menu1/menu1.vue'),
      children: [
        {
          path: 'menu11',
          name: 'Menu11',
          meta: {
            title: 'Menu1-1'
          },
          component: () => import('@/views/main/menu/menu1/menu11/menu11.vue')
        }
      ]
    },
    {
      path: 'menu2',
      name: 'Menu2',
      meta: {
        title: 'Menu2'
      },
      component: () => import('@/views/main/menu/menu2/menu2.vue')
    }
  ]
} as RouteRecordRaw
