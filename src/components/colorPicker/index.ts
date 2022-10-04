import { withInstall } from '@/utils/intsall'
import ColorPicker from './src/colorPicker.vue'
import ColorPickerAppTheme from './src/colorPickerAppTheme.vue'

export const MColorPicker = withInstall(ColorPicker)

export default MColorPicker

export const MColorPickerAppTheme = withInstall(ColorPickerAppTheme)

export * from './src/colorPicker'
export * from './src/colorPickerAppTheme'
