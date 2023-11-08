import type { ExtractPropTypes } from 'vue'
import type ColorPicker from './colorPicker.vue'
import { buildProps, definePropType, isUndefined, isString } from '@/utils'

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
  'update:modelValue': (color?: string) =>
    isUndefined(color) || isString(color),
  change: (color?: string) => isUndefined(color) || isString(color)
}

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerEmits = typeof colorPickerEmits

export type ColorPickerInstance = InstanceType<typeof ColorPicker>
