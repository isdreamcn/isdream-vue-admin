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
  },
  {
    tag: 'MCheckboxGroup',
    key: 'options',
    label: 'options',
    attrs: {
      options: [
        {
          label: 'Option 1',
          value: 1
        },
        {
          label: 'Option 2',
          value: 2
        },
        {
          label: 'Option 3',
          value: 3
        }
      ]
    }
  },
  {
    tag: 'MRadioGroup',
    key: 'radio',
    label: 'radio',
    attrs: {
      options: [
        {
          label: 'Option 1',
          value: 1
        },
        {
          label: 'Option 2',
          value: 2
        },
        {
          label: 'Option 3',
          value: 3,
          disabled: true
        }
      ]
    }
  }
])
