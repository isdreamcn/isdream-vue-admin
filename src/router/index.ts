import {
  createRouter,
  createWebHashHistory
  /* createWebHistory */
} from 'vue-router'

import routes from './routes'

const router = createRouter({
  routes,
  history: createWebHashHistory()
  // history: createWebHistory(import.meta.env.VITE_BASE_URL)
})

export default router

export { routesHandler } from './routes'
export type { RouteMapItem, RoleMenu } from './utils'
