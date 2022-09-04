/*
 * @Description:
 * @Author: mtm
 * @Date: 2022-08-29 22:40:35
 * @LastEditTime: 2022-09-04 13:07:56
 * @LastEditors: mtm
 */
import { defineConfig } from 'vite'
import path from 'path'

import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
// 自动导入
import AutoImport from 'unplugin-auto-import/vite'
// @see https://github.com/antfu/unplugin-vue-components
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// ElMessage样式失效
import ElementPlus from 'unplugin-element-plus/vite'

function _resolve(dir: string) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': _resolve('src')
    }
  },
  plugins: [
    vue(),
    DefineOptions(),
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
})
