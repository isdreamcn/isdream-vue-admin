import type Form from './form.vue'
import type { GlobalComponents } from '@/plugins/components/components'
import type { ExtractPropTypes, Component } from 'vue'
import type {
  ColProps,
  FormItemRule,
  FormInstance as ElFormInstance
} from 'element-plus'
import { buildProps, definePropType, isObject } from '@/utils'

export interface FormPropsField {
  tag: GlobalComponents | Component
  key: string
  label?: string
  // show !== false 则显示
  show?: boolean
  slot?: boolean
  attrs?: Record<string, any>
  colAttrs?: number | ColProps
  placeholder?: string
  validateRules?: FormItemRule[]
}

export const formProps = buildProps({
  fields: {
    type: definePropType<FormPropsField[]>(Array),
    required: true
  },
  modelValue: Object,
  labelWidth: {
    type: Number,
    default: 100
  },
  colAttrs: {
    type: definePropType<number | ColProps>([Number, Object]),
    default: 6
  },
  // 按钮放入col
  inline: {
    type: Boolean,
    default: true
  },
  submitText: {
    type: String
    // default: inline === true ? '搜索' : '确定'
  },
  cancelText: {
    type: String
    // default: '重置'
  },
  style: {
    type: definePropType<any>([String, Array, Object]),
    default: ''
  }
} as const)

export const formEmits = {
  'update:modelValue': (formData: Record<string, any>) => isObject(formData),
  submit: (formData: Record<string, any>) => isObject(formData),
  cancel: (formData: Record<string, any>) => isObject(formData),
  getForm: (elFormRef: ElFormInstance) => !!elFormRef
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormEmits = typeof formEmits

export type FormFields = FormProps['fields']

export type FormInstance = InstanceType<typeof Form>
