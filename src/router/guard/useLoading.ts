import type { Router } from 'vue-router'
import { useRouterStore } from '@/store'
import { debounce } from '@/utils'

export const useLoading = (router: Router) => {
  const notNeedLoading = debounce(() => {
    useRouterStore().setState({
      needLoading: false
    })
  }, 200)

  router.afterEach((to) => {
    useRouterStore().setState({
      needLoading: to.meta.needLoading,
      loading: false
    })
    notNeedLoading()
  })
}
