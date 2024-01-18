import type Table from './table.vue'
import type { ExtractPropTypes } from 'vue'
import type { ElTableColumn } from 'element-plus'
import { buildProps, definePropType, isArray } from '@/utils'

export interface TableColumn<T extends string = string> {
  key: T
  label?: string
  slot?: boolean
  width?: number
  fixed?: 'left' | 'right'
  attrs?: Partial<ExtractPropTypes<typeof ElTableColumn>> & Record<string, any>
  customRender?: (value: any, row: Record<string, any>, index: number) => string
}

export interface TablePaginationOptions {
  currentPage: number
  pageSize: number
  pageSizes: number[]
}

type TablePropsHttp = (params: any) => Promise<Service.ResultPagination<any[]>>

export const tableProps = buildProps({
  // 显示序号列
  series: {
    type: Boolean,
    default: true
  },
  columns: {
    type: definePropType<TableColumn[]>(Array),
    required: true
  },
  selectKeys: {
    type: Array
  },
  // 切换页码/http调用/data更新
  // 不会根据table数据，过滤selectKeys
  selectKeysKeep: {
    type: Boolean,
    default: false
  },
  // 行数据的 Key
  rowKey: {
    type: definePropType<string | ((row: Record<string, any>) => any)>([
      String,
      Function
    ]),
    default: 'id'
  },
  paginationConfig: {
    type: definePropType<false | TablePaginationOptions>([Boolean, Object]),
    default: (): TablePaginationOptions => ({
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
  // 重新请求http
  isReload: Boolean,
  http: {
    type: definePropType<TablePropsHttp>(Function)
  },
  params: {
    type: Object,
    default: () => ({})
  }
} as const)

export const tableEmits = {
  'update:isReload': (val: false) => val === false,
  'update:selectKeys': (val: any[]) => isArray(val)
}

export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableEmits = typeof tableEmits

export type TableInstance = InstanceType<typeof Table>
