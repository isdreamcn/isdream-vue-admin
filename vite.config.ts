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
// mock
import { viteMockServe } from 'vite-plugin-mock'

import config from './src/config'

function _resolve(dir: string) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
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
    ElementPlus(),
    viteMockServe({
      // TODO: https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md
      mockPath: 'mock',
      ignore: /^index/,
      // false 将禁用 mock 功能
      localEnabled: config.useMock,
      prodEnabled: config.useMock,
      injectCode: `
        import { setupProdMockServer } from '../mock';
        setupProdMockServer();
      `
    })
  ]
})
