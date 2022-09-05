import { createRouter, createWebHashHistory } from 'vue-router'

import routes from './routes'
import useGuard from './guard'

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

useGuard(router)

export default router
