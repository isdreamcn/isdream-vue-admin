import {
  createRouter,
  createWebHashHistory
  /* createWebHistory */
} from 'vue-router'
import { appConfig } from '@/config'
import { basicRoutes, routes } from './routes'
import { useRoutesHandler } from './useRoutesHandler'

const router = createRouter({
  routes: basicRoutes,
  history: createWebHashHistory()
  // history: createWebHistory(import.meta.env.VITE_BASE_URL)
})

export const routesHandler = useRoutesHandler(
  router,
  routes,
  appConfig.routesHandlerOptions
)

export default router
