import type { FormField } from '@/components'
import { reactive } from 'vue'

export const fields = reactive<FormField[]>([
  {
    tag: 'ElInput',
    key: 'name',
    label: '姓名',
    required: true
  },
  {
    tag: 'ElInput',
    key: 'address',
    label: '住址',
    required: true
  },
  {
    tag: 'ElInput',
    key: 'email',
    label: '邮箱地址',
    required: true
  }
])
