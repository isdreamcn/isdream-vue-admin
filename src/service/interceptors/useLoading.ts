import type { RequestInterceptors } from '../types'
import { watch } from 'vue'
import { useRouterStore } from '@/store'

const useLoadingShowHidden = () => {
  const routerStore = useRouterStore()
  let requestApis = 0
  const showLoading = () => {
    if (!routerStore.needLoading) {
      return
    }
    if (!routerStore.loading) {
      routerStore.setState({
        loading: true
      })
    }
    requestApis++
  }
  const hiddenLoading = () => {
    if (!routerStore.loading) {
      return
    }
    if (--requestApis === 0) {
      routerStore.setState({
        loading: false
      })
    }
  }

  // 切换路由
  watch(
    () => routerStore.loading,
    (loading) => {
      if (!loading) {
        requestApis = 0
      }
    }
  )
  return {
    showLoading,
    hiddenLoading
  }
}

export const useLoading = (): RequestInterceptors => {
  return {
    requestInterceptor(config) {
      const { showLoading } = useLoadingShowHidden()
      showLoading()
      return config
    },
    responseInterceptor(res) {
      const { hiddenLoading } = useLoadingShowHidden()
      hiddenLoading()
      return res
    },
    responseInterceptorCatch(error) {
      const { hiddenLoading } = useLoadingShowHidden()
      hiddenLoading()
      return error
    }
  }
}
