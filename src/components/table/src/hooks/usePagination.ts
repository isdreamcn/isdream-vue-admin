import { reactive, computed } from 'vue'
import type { TableProps } from '../table'

export interface PaginationParams {
  currentPage: number
  pageSize: number
}

export const usePagination = (props: TableProps) => {
  // 取消分页
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
    const end = paginationParams.currentPage * paginationParams.pageSize
    return props.data.slice(start, end)
  })

  return {
    paginationData,
    paginationParams,
    indexStart
  }
}
