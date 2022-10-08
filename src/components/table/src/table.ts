import type Table from './table.vue'
import type { ExtractPropTypes } from 'vue'
import { buildProps, definePropType, isArray } from '@/utils'

interface TablePropsColumn {
  label: string
  key: string
  slot?: boolean
  width?: number
  fixed?: 'left' | 'right'
  attrs?: Record<string, any>
  customRender?: (value: any, row: any, index: number) => void
}

interface PaginationOptions {
  currentPage: number
  pageSize: number
  pageSizes: number[]
}

export type TablePropsHttp = (
  params: any
) => Promise<{ data: any[]; count?: number }>

export const tableProps = buildProps({
  // 使用 hooks/usePagination 进行内部分页
  // http和data同时设置，使用http
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: definePropType<TablePropsColumn[]>(Array),
    required: true
  },
  selectKeys: {
    type: Array
  },
  // 行数据的 Key
  rowKey: {
    type: definePropType<string | ((row: any) => string)>([String, Function]),
    default: 'id'
  },
  paginationConfig: {
    type: definePropType<PaginationOptions | false>([Object, Boolean]),
    default: (): PaginationOptions => ({
      currentPage: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30]
    })
  },
  // http
  httpLazy: Boolean,
  // 重新发起请求http
  isReload: Boolean,
  http: {
    type: definePropType<TablePropsHttp>(Function)
  },
  params: {
    type: Object,
    default: () => {}
  },
  // 显示序号列
  series: {
    type: Boolean,
    default: true
  },
  loading: Boolean
} as const)

export const tableEmits = {
  'update:isReload': (val: false) => val === false,
  'update:selectKeys': (val: any[]) => isArray(val)
}

export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableEmits = typeof tableEmits

export type TableColumns = TableProps['columns']
export type TablePaginationConfig = TableProps['paginationConfig']

export type TableInstance = InstanceType<typeof Table>
