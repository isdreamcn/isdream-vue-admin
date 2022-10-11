import type Form from './form.vue'
import type { GlobalComponents } from '@/plugins/components/components'
import type { FormComponents } from './components'
import type { ExtractPropTypes, Component } from 'vue'
import type {
  ColProps,
  FormItemRule,
  FormInstance as ElFormInstance
} from 'element-plus'
import { buildProps, definePropType, isObject } from '@/utils'

export interface FormFieldAttrsOptions {
  label: string
  value: string | number
  disabled?: boolean
}

export interface FormPropsField {
  tag: GlobalComponents | FormComponents | Component
  key: string
  label?: string
  // show !== false 则显示
  show?: boolean
  slot?: boolean
  attrs?: Record<string, any> & { options?: FormFieldAttrsOptions[] }
  on?: Record<string, (...payload: any[]) => void>
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
  // 提交按钮
  loading: {
    type: Boolean,
    default: false
  },
  submitText: String,
  cancelText: String,
  submitIcon: String,
  cancelIcon: String,
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
