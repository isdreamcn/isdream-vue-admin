import type { RouteRecordRaw } from 'vue-router'
import config from '@/config'
import { loadFiles } from '@/utils'
import { RoutesHandler } from '../utils'

const loadRoutes = loadFiles<RouteRecordRaw>

export const routesHandler = new RoutesHandler(
  loadRoutes(import.meta.glob('./main/*.ts', { eager: true })),
  {
    generatorMenu: true,
    addRouteParentName: 'Layout',
    flatRoutes: true
  }
)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    meta: {
      hiddenInBread: true
    },
    redirect: {
      name: config.mainName
    },
    component: () => import('@/views/layout/layout.vue'),
    children: routesHandler.originRoutes
  },
  {
    path: '/user',
    redirect: {
      name: config.loginName
    },
    component: () => import('@/views/layout/userLayout/userLayout.vue'),
    children: loadRoutes(import.meta.glob('./user/*.ts', { eager: true }))
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: () => import('@/views/error/error404.vue')
  }
]

export default routes
