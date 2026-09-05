import type { TableProps } from '../table'
import type { PaginationParams } from './usePagination'
import { reactive, watch, readonly, computed } from 'vue'

interface HttpRes {
  data: Nullable<any[]>
  total: number
  loading: boolean
}

/**
 * http 数据源：params/分页变化自动请求，用递增请求 ID 丢弃过期响应防止竞态；
 * httpLazy 开启时首次变化不请求（仅标记 loading），首次请求由 isReload 或后续 params 变化触发
 */
export const useHttpData = (
  props: TableProps,
  paginationParams: Partial<PaginationParams>,
  requestFinally = () => {}
) => {
  const httpRes = reactive<HttpRes>({
    data: null,
    total: 0,
    loading: false
  })

  if (!props.http) {
    return readonly(httpRes)
  }

  const params = computed(() => ({
    ...props.params,
    page: paginationParams.currentPage,
    pageSize: paginationParams.pageSize
  }))

  let currentRequestId = 0

  const requestHttp = () => {
    if (props.http) {
      httpRes.loading = true
      const requestId = ++currentRequestId // 递增ID

      props
        .http(params.value)
        .then((res) => {
          if (requestId !== currentRequestId) return
          httpRes.data = res.data
          httpRes.total = res.count ?? res.data.length
        })
        .finally(() => {
          if (requestId !== currentRequestId) return
          httpRes.loading = false
          requestFinally()
        })
    }
  }

  let httpLazy = props.httpLazy
  watch(
    () => params.value,
    () => {
      if (httpLazy) {
        httpLazy = false
        httpRes.loading = true
        return
      }
      requestHttp()
    },
    {
      immediate: true
    }
  )

  watch(
    () => props.isReload,
    (val) => {
      if (val) {
        requestHttp()
      }
    }
  )

  return readonly(httpRes)
}
