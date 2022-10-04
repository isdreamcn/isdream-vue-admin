import type { ExtractPropTypes } from 'vue'
import type ColorPickerAppTheme from './colorPicker.vue'
import { definePropType, buildProps } from '@/utils'
import { AppSettingPartial, AppSetting } from '@/store'

export const colorPickerAppThemeProps = buildProps({
  cssKey: {
    type: String
  },
  handler: {
    type: definePropType<(color: string) => AppSettingPartial>(Function),
    default: () => {}
  },
  getHandler: {
    type: definePropType<(appSetting: AppSetting) => string>(Function),
    default: () => ''
  }
} as const)

export type ColorPickerAppThemeProps = ExtractPropTypes<
  typeof colorPickerAppThemeProps
>

export type ColorPickerAppThemeInstance = InstanceType<
  typeof ColorPickerAppTheme
>

export type ColorPickerAppThemePropsHandler =
  ColorPickerAppThemeProps['handler']

export type ColorPickerAppThemePropsGetHandler =
  ColorPickerAppThemeProps['getHandler']
