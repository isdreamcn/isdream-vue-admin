import type { TableColumn } from '@/components'

export const tableColumns: TableColumn[] = [
  {
    key: 'userInfo',
    label: '用户信息',
    children: [
      {
        key: 'nameAddress',
        label: '姓名/地区',
        children: [
          {
            key: 'name',
            label: '姓名',
            width: 200
          },
          {
            key: 'address',
            label: '地区',
            width: 200,
            slot: true
          }
        ]
      },
      {
        key: 'email',
        label: '邮箱'
      }
    ]
  },
  {
    key: 'userInfo.origin',
    label: '来源',
    customRender: (val) => val && '来源: ' + val
  },
  {
    key: 'createAt',
    label: '创建日期',
    slot: true
  },
  {
    key: 'updateAt',
    label: '更新日期'
  },
  {
    key: 'actions',
    label: '操作',
    slot: true,
    fixed: 'right'
  }
]
