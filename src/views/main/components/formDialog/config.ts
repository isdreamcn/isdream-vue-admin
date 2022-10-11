import { FormFields } from '@/components'
import { reactive } from 'vue'

export const fields: FormFields = reactive([
  {
    tag: 'ElInput',
    key: 'name',
    label: '姓名',
    validateRules: [
      {
        required: true,
        message: '请输入姓名',
        trigger: 'change'
      }
    ]
  },
  {
    tag: 'ElDatePicker',
    key: 'date',
    label: '日期',
    attrs: {
      // disabled: true
    }
  },
  {
    tag: 'MSelect',
    key: 'age',
    label: '性别',
    attrs: {
      options: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 2
        },
        {
          label: '保密',
          value: 3,
          disabled: true
        }
      ]
    }
  }
])
