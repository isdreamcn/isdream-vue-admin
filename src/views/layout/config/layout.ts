import type { AppSettingPartial } from '@/store'
import { Component, defineAsyncComponent } from 'vue'

export interface LayoutFunctionItem {
  label: string
  appSettingKey: string
  default?: boolean
}

export interface LayoutMapItem {
  component: Component
  label: string
  appSetting: AppSettingPartial
  functions: LayoutFunctionItem[]
}

export type LayoutKey = 'mainLayout' | 'topMenuLayout'

export interface LayoutOption {
  label: string
  value: LayoutKey
}

export const layoutMap = new Map<LayoutKey, LayoutMapItem>([
  [
    'mainLayout',
    {
      component: defineAsyncComponent(
        () => import('../mainLayout/mainLayout.vue')
      ),
      label: '左侧菜单',
      appSetting: {
        menu: {
          mode: 'vertical'
        }
      },
      functions: [
        {
          label: '合并多模块菜单',
          appSettingKey: 'menu.mergeTopMenu'
        },
        {
          label: '折叠菜单',
          appSettingKey: 'menu.collapsed'
        },
        {
          label: 'logo',
          appSettingKey: 'showLogo'
        },
        {
          label: '面包屑',
          appSettingKey: 'breadcrumb.show'
        },
        {
          label: '面包屑图标',
          appSettingKey: 'breadcrumb.icon'
        },
        {
          label: '标签页',
          appSettingKey: 'routeHistory.show'
        },
        {
          label: '标签页按钮',
          appSettingKey: 'routeHistory.actions'
        },
        {
          label: '页脚',
          appSettingKey: 'footer.show'
        }
      ]
    }
  ],
  [
    'topMenuLayout',
    {
      component: defineAsyncComponent(
        () => import('../topMenuLayout/topMenuLayout.vue')
      ),
      label: '顶部菜单',
      appSetting: {
        menu: {
          mode: 'horizontal',
          collapsed: false
        }
      },
      functions: [
        {
          label: '合并多模块菜单',
          appSettingKey: 'menu.mergeTopMenu'
        },
        {
          label: 'logo',
          appSettingKey: 'showLogo'
        },
        {
          label: '面包屑',
          appSettingKey: 'breadcrumb.show'
        },
        {
          label: '面包屑图标',
          appSettingKey: 'breadcrumb.icon'
        },
        {
          label: '标签页',
          appSettingKey: 'routeHistory.show'
        },
        {
          label: '标签页按钮',
          appSettingKey: 'routeHistory.actions'
        },
        {
          label: '页脚',
          appSettingKey: 'footer.show'
        }
      ]
    }
  ]
])

export const layoutOptions: LayoutOption[] = [...layoutMap.entries()].map(
  ([key, item]) => ({
    label: item.label,
    value: key
  })
)

export const getLayout = (key: LayoutKey) => {
  return layoutMap.get(key)
}
