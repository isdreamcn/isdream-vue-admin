import type { RouteRecordRaw } from 'vue-router'
import { appConfig } from '@/config'
import { loadFiles } from '@/utils'
import { createHasNameComponent } from '@/views/layout'

const loadRoutes = loadFiles<RouteRecordRaw>

// 经过`useRoutesHandler`处理，动态添加到`router`上
export const routes: RouteRecordRaw[] = [
  ...loadRoutes(import.meta.glob('./examples/*.ts', { eager: true }))
]

// 基础路由、不受权限控制
export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: appConfig.routeMainName,
    meta: {
      needToken: true
    },
    component: createHasNameComponent(
      () => import('@/views/layout/layout.vue'),
      appConfig.routeMainName
    )
  },
  {
    path: '/topMenuNav',
    meta: {
      title: '菜单导航',
      needToken: true,
      needRouteHistory: false
    },
    component: () => import('@/views/topMenuNav/topMenuNav.vue')
  },
  {
    path: '/user',
    redirect: {
      name: appConfig.routeLoginName
    },
    component: () => import('@/views/layout/userLayout/userLayout.vue'),
    children: loadRoutes(import.meta.glob('./user/*.ts', { eager: true }))
  },
  {
    path: '/:pathMatch(.*)*',
    meta: {
      needToken: true,
      needRouteHistory: false
    },
    component: () => import('@/views/error/error404.vue')
  }
]
