import type { Router } from 'vue-router'
import { useRouterStore } from '@/store'
import { appConfig } from '@/config'
import { debounce } from '@/utils'

export const useLoading = (router: Router) => {
  const routerStore = useRouterStore()
  const notNeedLoading = debounce(() => {
    routerStore.setState({
      needLoading: false
    })
  }, 200)

  router.afterEach((to) => {
    routerStore.setState({
      needLoading:
        to.meta.needLoading ?? appConfig.defaultRouteMeta.needLoading,
      loading: false
    })
    notNeedLoading()
  })
}
