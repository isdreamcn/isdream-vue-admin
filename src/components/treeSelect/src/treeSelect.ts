import type { ExtractPropTypes } from 'vue'
import type TreeSelect from './treeSelect.vue'
import { buildProps, definePropType, isNil } from '@/utils'

export interface TreeSelectFields {
  value?: string
  label?: string
  children?: string
}

export const treeSelectProps = buildProps({
  modelValue: {
    type: definePropType<any>([String, Number, Boolean, Object, Array])
  },
  data: {
    type: Array,
    default: () => []
  },
  fields: {
    type: definePropType<TreeSelectFields>(Object),
    default: () => ({})
  }
} as const)

export const treeSelectEmits = {
  'update:modelValue': (val: any | any[]) => !isNil(val)
}

export type TreeSelectProps = ExtractPropTypes<typeof treeSelectProps>
export type TreeSelectEmits = typeof treeSelectEmits

export type TreeSelectInstance = InstanceType<typeof TreeSelect>
