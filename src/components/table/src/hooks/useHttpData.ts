import type { TableProps } from '../table'
import type { PaginationParams } from './usePagination'
import { reactive, watch, readonly, computed } from 'vue'

interface HttpRes {
  data: Nullable<any[]>
  total: number
  loading: boolean
}

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

  const requestHttp = () => {
    if (props.http) {
      httpRes.loading = true
      props
        .http(params.value)
        .then((res) => {
          httpRes.data = res.data
          httpRes.total = res.count ?? res.data.length
        })
        .finally(() => {
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

  // 重新请求http
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
