import type { Component } from 'vue'
import type { AppSettingPartial } from '@/store/index'
import mainLayout from '../mainLayout/mainLayout.vue'
import topMenuLayout from '../topMenuLayout/topMenuLayout.vue'

export interface LayoutFunctionItem {
  label: string
  appSettingKey: string
  default?: boolean
}

export interface LayoutMapItem {
  componnet: Component
  label: string
  appSetting: AppSettingPartial
  functions: LayoutFunctionItem[]
}

export type LayoutKeys = 'mainLayout' | 'topMenuLayout'

export interface layoutOption {
  label: string
  value: LayoutKeys
}

export const layoutMap = new Map<LayoutKeys, LayoutMapItem>([
  [
    'mainLayout',
    {
      componnet: mainLayout,
      label: '左侧菜单',
      appSetting: {
        showLogo: true,
        menu: {
          mode: 'vertical',
          collapsed: false
        }
      },
      functions: [
        {
          label: '折叠菜单',
          appSettingKey: 'menu.collapsed'
        },
        {
          label: 'logo',
          appSettingKey: 'showLogo'
        }
      ]
    }
  ],
  [
    'topMenuLayout',
    {
      componnet: topMenuLayout,
      label: '顶部菜单',
      appSetting: {
        showLogo: true,
        menu: {
          mode: 'horizontal',
          collapsed: false
        }
      },
      functions: [
        {
          label: 'logo',
          appSettingKey: 'showLogo'
        }
      ]
    }
  ]
])

export const layoutOptions: layoutOption[] = []
layoutMap.forEach((item, key) => {
  layoutOptions.push({
    label: item.label,
    value: key
  })
})

export const getLayout = (key: LayoutKeys) => {
  return layoutMap.get(key)!
}
