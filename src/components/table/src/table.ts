import type Table from './table.vue'
import type { ExtractPropTypes } from 'vue'
import type { ElTableColumn } from 'element-plus'
import { buildProps, definePropType, isArray } from '@/utils'

interface TablePropsColumn<T extends string = string> {
  key: T
  label?: string
  slot?: boolean
  width?: number
  fixed?: 'left' | 'right'
  attrs?: Partial<ExtractPropTypes<typeof ElTableColumn>> & Record<string, any>
  customRender?: (value: any, row: Record<string, any>, index: number) => void
}

interface PaginationOptions {
  currentPage: number
  pageSize: number
  pageSizes: number[]
}

export type TablePropsHttp = (
  params: any
) => Promise<Service.ResultPagination<any[]>>

export const tableProps = buildProps({
  // 显示序号列
  series: {
    type: Boolean,
    default: true
  },
  columns: {
    type: definePropType<TablePropsColumn[]>(Array),
    required: true
  },
  selectKeys: {
    type: Array,
    default: () => []
  },
  // 行数据的 Key
  rowKey: {
    type: definePropType<string | ((row: Record<string, any>) => string)>([
      String,
      Function
    ]),
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
  loading: Boolean,
  // 使用 hooks/usePagination 进行内部分页
  // http和data同时设置，使用http
  data: {
    type: Array,
    default: () => []
  },
  // http 不会立即执行、params发生变化、isReload = true 调用http
  httpLazy: Boolean,
  // 重新发起请求http
  isReload: Boolean,
  http: {
    type: definePropType<TablePropsHttp>(Function)
  },
  params: {
    type: Object,
    default: () => {}
  }
} as const)

export const tableEmits = {
  'update:isReload': (val: false) => val === false,
  'update:selectKeys': (val: any[]) => isArray(val)
}

export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableEmits = typeof tableEmits

export type TableColumn<T extends string = string> = TablePropsColumn<T>
export type TablePaginationConfig = PaginationOptions

export type TableInstance = InstanceType<typeof Table>
