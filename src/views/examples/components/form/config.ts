import type { FormField } from '@/components'
import { reactive } from 'vue'

export const fields = reactive<FormField[]>([
  {
    tag: 'ElInput',
    key: 'name',
    label: '姓名',
    required: true,
    colAttrs: 12
  },
  {
    tag: 'ElDatePicker',
    key: 'date',
    label: '日期',
    colAttrs: 12,
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
          value: 2,
          disabled: true
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
        }
      ]
    }
  },
  {
    tag: 'MUpload',
    key: 'files',
    label: '附件'
  }
])

// 联动表单：show/attrs 函数式 + 提交过滤（默认只回传可见字段）
export const linkageFields: FormField[] = [
  {
    tag: 'MSelect',
    key: 'notifyType',
    label: '通知方式',
    attrs: {
      clearable: true,
      options: [
        { label: '短信', value: 'sms' },
        { label: '邮箱', value: 'email' }
      ]
    }
  },
  {
    tag: 'ElInput',
    key: 'phone',
    label: '手机号',
    show: (model) => model.notifyType === 'sms'
  },
  {
    tag: 'ElInput',
    key: 'email',
    label: '邮箱地址',
    show: (model) => model.notifyType === 'email'
  },
  {
    tag: 'ElInput',
    key: 'remark',
    label: '备注（未选通知方式时禁用）',
    attrs: (model) => ({ disabled: !model.notifyType })
  }
]
