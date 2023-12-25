import type { ExtractPropTypes } from 'vue'
import type SearchTree from './searchTree.vue'
import { buildProps, definePropType, isNil } from '@/utils'

export interface SearchTreeFields {
  value?: string
  label?: string
  children?: string
}

export const searchTreeProps = buildProps({
  modelValue: {
    type: definePropType<any>([String, Number, Array])
  },
  data: {
    type: Array,
    default: () => []
  },
  height: {
    type: String,
    default: '600px'
  },
  fields: {
    type: definePropType<SearchTreeFields>(Object),
    default: () => ({})
  }
} as const)

export const searchTreeEmits = {
  'update:modelValue': (val: any | any[]) => !isNil(val)
}

export type SearchTreeProps = ExtractPropTypes<typeof searchTreeProps>
export type SearchTreeEmits = typeof searchTreeEmits

export type SearchTreeInstance = InstanceType<typeof SearchTree>
