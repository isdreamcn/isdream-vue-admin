import type { RouteRecordRaw } from 'vue-router'
import appConfig from '@/config'
import { loadFiles } from '@/utils'
import { RoutesHandler } from '../utils'

const loadRoutes = loadFiles<RouteRecordRaw>

export const routesHandler = new RoutesHandler(
  loadRoutes(import.meta.glob('./main/*.ts', { eager: true })),
  {
    generatorMenu: true,
    addRouteParentName: appConfig.routeMainName,
    flatRoutes: true
  }
)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: appConfig.routeMainName,
    component: () => import('@/views/layout/layout.vue'),
    children: routesHandler.originRoutes
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

export default routes
