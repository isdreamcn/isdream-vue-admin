import {
  ColorPickerAppThemePropsHandler,
  ColorPickerAppThemePropsGetHandler
} from '@/components'

export const useColorPrimary = () => {
  const handler: ColorPickerAppThemePropsHandler = (color: string) => {
    return {
      colorPrimary: color
    }
  }

  const getHandler: ColorPickerAppThemePropsGetHandler = (appSetting) => {
    return appSetting.colorPrimary
  }

  return {
    cssKey: '--el-color-primary',
    handler,
    getHandler
  }
}
