import type Form from './form.vue'
import type { GlobalComponents } from '@/plugins/components'
import type { FormComponents } from './components'
import type { ExtractPropTypes, Component } from 'vue'
import type {
  ColSize,
  FormItemRule,
  FormInstance as ElFormInstance
} from 'element-plus'
import { buildProps, definePropType, isObject, isNil } from '@/utils'

export interface FormFieldOptions {
  label: string
  value: string | number
  disabled?: boolean
}

export interface FormField {
  tag: GlobalComponents | FormComponents | Component
  key: string
  label?: string
  // show !== false 则显示
  show?: boolean
  slot?: boolean
  attrs?: {
    options?: FormFieldOptions[]
    placeholder?: string
    disabled?: boolean
    [key: string]: any
  }
  on?: Record<string, (...payload: any[]) => void>
  colAttrs?: ColSize
  required?: boolean
  validateRules?: FormItemRule[]
}

export const formProps = buildProps({
  fields: {
    type: definePropType<FormField[]>(Array),
    required: true
  },
  modelValue: {
    type: Object,
    default: () => ({})
  },
  labelWidth: {
    type: definePropType<number | string>([Number, String]),
    default: 'auto'
  },
  colAttrs: {
    type: definePropType<ColSize>([Number, Object]),
    default: 6
  },
  disabled: {
    type: Boolean,
    default: undefined
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
  submitIcon: {
    type: definePropType<string | false>([String, Boolean]),
    default: undefined
  },
  cancelIcon: {
    type: definePropType<string | false>([String, Boolean]),
    default: undefined
  }
} as const)

export const formEmits = {
  'update:modelValue': (formData: Record<string, any>) => isObject(formData),
  submit: (formData: Record<string, any>) => isObject(formData),
  cancel: (formData: Record<string, any>) => isObject(formData),
  getForm: (elFormRef: ElFormInstance) => !isNil(elFormRef)
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormEmits = typeof formEmits

export type FormInstance = InstanceType<typeof Form>
