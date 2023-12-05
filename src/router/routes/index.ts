import type { RouteRecordRaw } from 'vue-router'
import { appConfig } from '@/config'
import { loadFiles } from '@/utils'

const loadRoutes = loadFiles<RouteRecordRaw>

// 经过`useRoutesHandler`处理，动态添加到`router`上
export const routes: RouteRecordRaw[] = [
  ...loadRoutes(import.meta.glob('./main/*.ts', { eager: true }))
]

// 基础路由、不受权限控制
export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: appConfig.routeMainName,
    component: () => import('@/views/layout/layout.vue')
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
      needRouteHistory: false
    },
    component: () => import('@/views/error/error404.vue')
  }
]
