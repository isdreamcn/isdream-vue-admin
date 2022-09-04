/*
 * @Description:
 * @Author: mtm
 * @Date: 2022-09-04 22:40:25
 * @LastEditTime: 2022-09-04 22:43:52
 * @LastEditors: mtm
 */
import type { Router } from 'vue-router'

const useGuard = (router: Router) => {
  router.beforeEach((to, from) => {
    console.log(to, from)
  })

  router.beforeEach((to, from) => {
    console.log(to, from)
  })
}

export default useGuard
