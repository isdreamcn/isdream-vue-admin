import type { Router } from 'vue-router'
import { composeFns } from '@/utils'
import { useHasToken } from './utils'

const pause = (val: any) => val !== true
const useGuard = (router: Router) => {
  router.beforeEach((to) => {
    return composeFns<any>([useHasToken(to)], pause)(true)
  })

  router.afterEach((to, from) => {
    false && console.log(to, from)
  })
}

export default useGuard
