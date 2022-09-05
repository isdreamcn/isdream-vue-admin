/*
 * @Description:
 * @Author: mtm
 * @Date: 2022-09-04 22:40:20
 * @LastEditTime: 2022-09-04 23:20:20
 * @LastEditors: mtm
 */
import config from '@/config'

import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'login',
  name: config.loginName,
  component: () => import('@/views/user/login/login.vue')
} as RouteRecordRaw
