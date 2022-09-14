import {
  createRouter,
  createWebHashHistory
  /* createWebHistory */
} from 'vue-router'

import routes from './routes'
import useGuard from './guard'

const router = createRouter({
  routes,
  history: createWebHashHistory()
  // history: createWebHistory(import.meta.env.BASE_URL)
})

useGuard(router)

export default router
