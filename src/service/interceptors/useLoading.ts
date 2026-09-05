import type { ServiceInterceptors } from '../service'
import { watch } from 'vue'
import { useRouterStore } from '@/store'

/** 各 url 的并发请求计数：url => 未完成请求数 */
const requestApiMap = new Map<string, number>()

let watchLoadingFlag = false
/** 注册一次全局 watch：路由 loading 关闭时清空请求计数，避免残留计数卡住 loading */
const watchLoading = () => {
  if (watchLoadingFlag) {
    return
  }
  const routerStore = useRouterStore()
  watchLoadingFlag = true
  watch(
    () => routerStore.loading,
    (loading) => {
      if (!loading && requestApiMap.size) {
        requestApiMap.clear()
      }
    }
  )
}

/** 请求开始：该 url 计数 +1，首个请求时开启全局 loading（仅当路由 meta.needLoading） */
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

/** 请求结束：该 url 计数 -1，全部 url 归零后关闭全局 loading */
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

/**
 * 全局 loading 拦截器：按 url 记录并发请求计数，
 * 同名请求全部完成后才关闭 loading，与路由级 loading 联动
 */
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
