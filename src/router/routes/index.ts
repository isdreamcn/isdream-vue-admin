/*
 * @Description:
 * @Author: mtm
 * @Date: 2022-09-04 22:11:59
 * @LastEditTime: 2022-09-04 22:38:20
 * @LastEditors: mtm
 */
import type { RouteRecordRaw } from 'vue-router'

import config from '@/config'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: config.mainName
    }
  },
  {
    path: '/login',
    name: config.loginName,
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: config.mainName,
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: () => import('@/views/error/error404.vue')
  }
]

export default routes
