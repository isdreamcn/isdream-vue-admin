import type { ExtractPropTypes } from 'vue'
import type ColorPicker from './colorPicker.vue'
import { isString } from '@vue/shared'
import { buildProps, definePropType } from '@/utils'

export interface ColorPickerOptionsItem {
  label?: string
  value: string
}

export const colorPickerProps = buildProps({
  modelValue: String,
  options: {
    type: definePropType<ColorPickerOptionsItem[]>(Array),
    default: () => []
  },
  custom: {
    type: Boolean,
    default: true
  }
} as const)

export const colorPickerEmits = {
  'update:modelValue': (color?: string) => (color ? isString(color) : true),
  change: (color?: string) => (color ? isString(color) : true)
}

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerEmits = typeof colorPickerEmits

export type ColorPickerInstance = InstanceType<typeof ColorPicker>
