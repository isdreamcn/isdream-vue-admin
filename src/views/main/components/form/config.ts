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
        message: 'Please select Activity zone',
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
  }
])
