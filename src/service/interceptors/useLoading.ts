import type { ServiceInterceptors } from '../service'
import { watch } from 'vue'
import { useRouterStore } from '@/store'

const requestApiMap = new Map<string, number>()

let watchLoadingFlag = false
const watchLoading = () => {
  if (watchLoadingFlag) {
    return
  }
  const routerStore = useRouterStore()
  watchLoadingFlag = true
  // 切换路由
  watch(
    () => routerStore.loading,
    (loading) => {
      if (!loading && requestApiMap.size) {
        requestApiMap.clear()
      }
    }
  )
}

const showLoading = (url?: string) => {
  if (!url) return
  const routerStore = useRouterStore()
  if (!routerStore.needLoading) {
    return
  }
  if (!routerStore.loading) {
    routerStore.setState({
      loading: true
    })
  }
  requestApiMap.set(url, (requestApiMap.get(url) || 0) + 1)
}

const hiddenLoading = (url?: string) => {
  if (!url) return
  const routerStore = useRouterStore()
  if (!routerStore.loading) {
    return
  }
  const requestApiNum = (requestApiMap.get(url) || 1) - 1
  if (!requestApiNum) {
    requestApiMap.delete(url)
  } else {
    requestApiMap.set(url, requestApiNum)
  }
  if (!requestApiMap.size) {
    routerStore.setState({
      loading: false
    })
  }
}

export const useLoading = (): ServiceInterceptors => {
  return {
    requestInterceptor(config) {
      watchLoading()
      showLoading(config.url)
      return config
    },
    responseInterceptor(res) {
      hiddenLoading(res.config.url)
      return res
    },
    responseInterceptorCatch(err) {
      hiddenLoading(err.config?.url)
      return Promise.reject(err)
    }
  }
}
