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
  const { showLoading, hiddenLoading } = useLoadingShowHidden()
  return {
    requestInterceptor(config) {
      showLoading()
      return config
    },
    responseInterceptor(res) {
      hiddenLoading()
      return res
    },
    responseInterceptorCatch(error) {
      hiddenLoading()
      return error
    }
  }
}
