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
