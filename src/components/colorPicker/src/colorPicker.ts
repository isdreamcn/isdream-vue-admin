import type { ExtractPropTypes } from 'vue'
import type ColorPicker from './colorPicker.vue'
import { isString } from '@vue/shared'
import { buildProps, definePropType } from '@/utils/components/props'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '@/constants/event'

interface OptionsItem {
  label: string
  value: string
}

export const colorPickerProps = buildProps({
  modelValue: String,
  options: {
    type: definePropType<OptionsItem[]>(Array),
    default: () => []
  },
  custom: {
    type: Boolean,
    default: true
  }
} as const)

export const colorPickerEmits = {
  [UPDATE_MODEL_EVENT]: (color?: string) => (color ? isString(color) : true),
  [CHANGE_EVENT]: (color?: string) => (color ? isString(color) : true)
}

export type ColorPickerProps = ExtractPropTypes<typeof colorPickerProps>
export type ColorPickerEmits = typeof colorPickerEmits

export type ColorPickerInstance = InstanceType<typeof ColorPicker>
