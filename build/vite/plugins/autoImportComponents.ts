// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
// TODO:https://github.com/antfu/unplugin-vue-components
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import 手动导入的组件、自动其导入样式
import ElementPlus from 'unplugin-element-plus/vite'

export const useAutoImportComponents = (isBuild: boolean) => {
  return isBuild
    ? [
        AutoImport({
          resolvers: [ElementPlusResolver()]
        }),
        Components({
          dts: true,
          resolvers: [
            ElementPlusResolver({
              importStyle: 'sass'
            }),
            // @/components
            (componentName) => {
              if (componentName.startsWith('M'))
                return { name: componentName, from: '@/components' }
            }
            // @element-plus/icons-vue 已全局注册(为了支持动态组件)
            // (componentName) => {
            //   if (componentName.startsWith('Icon'))
            //     return {
            //       name: componentName.substring(4),
            //       from: '@element-plus/icons-vue'
            //     }
            // }
          ]
        }),
        ElementPlus({
          useSource: true
        })
      ]
    : []
}
