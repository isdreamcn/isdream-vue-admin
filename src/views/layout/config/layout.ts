import type { Component } from 'vue'
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
      functions: [
        {
          label: 'test',
          appSettingKey: 'test'
        }
      ]
    }
  ],
  [
    'topMenuLayout',
    {
      componnet: topMenuLayout,
      label: '顶部菜单',
      functions: [
        {
          label: 'test',
          appSettingKey: 'test'
        },
        {
          label: 'test1',
          appSettingKey: 'test1'
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
