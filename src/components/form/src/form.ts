import type Form from './form.vue'
import type { GlobalComponents } from '@/plugins/components'
import type { FormComponents } from './components'
import type { ExtractPropTypes, Component } from 'vue'
import type { RowProps, ColSize, FormItemRule } from 'element-plus'
import { buildProps, definePropType, isObject } from '@/utils'

export interface FormFieldOptions {
  label: string
  value: string | number
  disabled?: boolean
}

export interface FormFieldAttrs {
  options?: FormFieldOptions[]
  placeholder?: string
  disabled?: boolean
  [key: string]: any
}

export interface FormField {
  tag: GlobalComponents | FormComponents | Component
  key: string
  label?: string
  // show !== false 则显示；支持函数式，按表单数据动态判断显隐
  show?: boolean | ((model: Record<string, any>) => boolean)
  slot?: boolean
  // attrs 支持函数式，跟随表单数据变化（如联动禁用、动态 options）
  attrs?: FormFieldAttrs | ((model: Record<string, any>) => FormFieldAttrs)
  on?: Record<string, (...payload: any[]) => void>
  colAttrs?: ColSize
  required?: boolean
  // 必填校验提示文案，默认按组件类型自动生成（请填写/请选择/请上传）
  message?: string
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
  rowAttrs: {
    type: definePropType<RowProps>(Object),
    default: () => ({})
  },
  colAttrs: {
    type: definePropType<ColSize>([Number, Object]),
    default: 6
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // 按钮放入col
  inline: {
    type: Boolean,
    default: true
  },
  // inline 模式下字段超出一行时自动折叠，显示「展开/收起」按钮（disabled 时不折叠）
  autoCollapse: {
    type: Boolean,
    default: true
  },
  // 提交口径（与 filterHidden 正交）：
  // filter 管 fields 之外的字段——true（默认）时提交/取消不回传 fields 外的字段；
  // false 时 fields 外字段（如回显的 id）原样保留回传
  filter: {
    type: Boolean,
    default: true
  },
  // filterHidden 管 fields 内隐藏字段——true（默认）时字段隐藏即清除数据、
  // 提交/取消不回传隐藏字段；false 时隐藏字段数据保留并回传
  filterHidden: {
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
  cancel: (formData: Record<string, any>) => isObject(formData)
}

export type FormProps = ExtractPropTypes<typeof formProps>
export type FormEmits = typeof formEmits

export type MFormInstance = InstanceType<typeof Form>
