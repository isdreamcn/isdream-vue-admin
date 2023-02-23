import type { ExtractPropTypes } from 'vue'
import type { ColorPickerOptionsItem } from './colorPicker'
import type ColorPickerAppTheme from './colorPicker.vue'
import { buildProps, definePropType } from '@/utils'

export const colorPickerAppThemeProps = buildProps({
  cssKey: {
    type: String
  },
  appSettingKey: {
    type: String,
    default: ''
  },
  options: {
    type: definePropType<ColorPickerOptionsItem[]>(Array),
    default: () => [
      {
        label: '拂晓蓝',
        value: '#1890FF'
      },
      {
        label: '酱紫',
        value: '#722ED1'
      },
      {
        label: '绿松石',
        value: '#1abc9c'
      },
      {
        label: '湿沥青',
        value: '#34495e'
      },
      {
        label: '金盏花',
        value: '#faad14'
      },
      {
        label: '极光绿',
        value: '#52C41A'
      },
      {
        label: '薄暮',
        value: '#f5222d'
      },
      {
        label: '明青',
        value: '#13C2C2'
      }
    ]
  }
} as const)

export type ColorPickerAppThemeProps = ExtractPropTypes<
  typeof colorPickerAppThemeProps
>

export type ColorPickerAppThemeInstance = InstanceType<
  typeof ColorPickerAppTheme
>
