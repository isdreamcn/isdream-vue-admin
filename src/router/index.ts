import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'
import useGuard from './guard'

const router = createRouter({
  routes,
  history: createWebHistory()
})

useGuard(router)

export default router
