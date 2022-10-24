import type { ExtractPropTypes } from 'vue'
import type ColorPickerAppTheme from './colorPicker.vue'
import { buildProps } from '@/utils'

export const colorPickerAppThemeProps = buildProps({
  cssKey: {
    type: String
  },
  appSettingKey: {
    type: String,
    default: ''
  }
} as const)

export type ColorPickerAppThemeProps = ExtractPropTypes<
  typeof colorPickerAppThemeProps
>

export type ColorPickerAppThemeInstance = InstanceType<
  typeof ColorPickerAppTheme
>
