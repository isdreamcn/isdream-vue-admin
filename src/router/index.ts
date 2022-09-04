/*
 * @Description:
 * @Author: mtm
 * @Date: 2022-09-04 22:10:13
 * @LastEditTime: 2022-09-04 22:42:39
 * @LastEditors: mtm
 */
import { createRouter, createWebHashHistory } from 'vue-router'

import routes from './routes'
import useGuard from './guard'

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

useGuard(router)

export default router
