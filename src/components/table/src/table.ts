import type Table from './table.vue'
import type { ExtractPropTypes } from 'vue'
import { buildProps, definePropType } from '@/utils'

interface TablePropsColumn {
  title: string
  key: string
  width?: number
}

export const tableProps = buildProps({
  data: Array,
  columns: {
    type: definePropType<TablePropsColumn[]>(Array),
    required: true
  }
} as const)

export const tableEmits = {}

export type TableProps = ExtractPropTypes<typeof tableProps>
export type TableEmits = typeof tableEmits

export type TableColumns = TableProps['columns']
export type TableInstance = InstanceType<typeof Table>
