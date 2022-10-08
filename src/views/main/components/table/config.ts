import type { TableColumns } from '@/components'

export const tableColumns: TableColumns = [
  {
    label: '姓名',
    key: 'name',
    width: 200
  },
  {
    label: '地区',
    key: 'address',
    width: 200
  },
  {
    label: '邮箱',
    key: 'email'
  },
  {
    label: '来源',
    key: 'userinfo.origin',
    customRender: (val) => '来源: ' + val
  },
  {
    label: '创建日期',
    key: 'createAt'
  },
  {
    label: '更新日期',
    key: 'updateAt'
  },
  {
    label: '操作',
    key: 'actions',
    slot: true,
    fixed: 'right'
  }
]
