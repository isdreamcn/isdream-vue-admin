// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
// TODO:https://github.com/antfu/unplugin-vue-components
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// ElMessage样式失效
import ElementPlus from 'unplugin-element-plus/vite'

export const useAutoImportComponents = () => {
  return [
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: true,
      resolvers: [
        ElementPlusResolver(),
        (componentName) => {
          if (componentName.startsWith('M'))
            return { name: componentName, from: '@/components' }
        }
      ]
    }),
    ElementPlus()
  ]
}
