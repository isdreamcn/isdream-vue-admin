/*
 * @Description:
 * @Author: mtm
 * @Date: 2022-09-04 22:59:59
 * @LastEditTime: 2022-09-04 23:10:20
 * @LastEditors: mtm
 */
import config from '@/config'

import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'home',
  name: config.mainName,
  component: () => import('@/views/main/home/home.vue')
} as RouteRecordRaw
