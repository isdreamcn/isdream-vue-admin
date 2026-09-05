import { reactive, computed } from 'vue'
import type { TableProps } from '../table'

export interface PaginationParams {
  currentPage: number
  pageSize: number
}

/**
 * 前端分页：对传入的 data 切片展示，并输出当前页起始序号；
 * 未配置 paginationConfig 时取消分页，data 原样透传
 */
export const usePagination = (props: TableProps) => {
  if (!props.paginationConfig) {
    return {
      paginationData: computed(() => props.data),
      paginationParams: {
        currentPage: undefined,
        pageSize: undefined
      },
      indexStart: computed(() => 0)
    }
  }

  const paginationParams = reactive<PaginationParams>({
    currentPage: props.paginationConfig.currentPage,
    pageSize: props.paginationConfig.pageSize
  })

  const indexStart = computed(
    () => (paginationParams.currentPage - 1) * paginationParams.pageSize
  )

  const paginationData = computed(() => {
    const start = indexStart.value
    const end = start + paginationParams.pageSize
    return props.data.slice(start, end)
  })

  return {
    paginationData,
    paginationParams,
    indexStart
  }
}
