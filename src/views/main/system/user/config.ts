import type { TableColumn, FormField } from '@/components'
import { reactive } from 'vue'

export const fields = reactive<FormField[]>([
  {
    key: 'name',
    label: '昵称',
    tag: 'ElInput'
  }
])

export const columns: TableColumn[] = [
  {
    key: 'name',
    label: '昵称'
  },
  {
    key: 'createAt',
    label: '创建日期',
    slot: true
  },
  {
    key: 'actions',
    label: '操作',
    slot: true,
    fixed: 'right'
  }
]

export const dialogFields = reactive<FormField[]>([
  {
    key: 'name',
    label: '昵称',
    tag: 'ElInput',
    required: true
  }
])
