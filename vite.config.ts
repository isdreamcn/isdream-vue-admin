import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import { wrapperLoadViteEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugins'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root) as LoadViteEnv
  const viteEnv = wrapperLoadViteEnv(env)
  const isBuild = command === 'build'

  return {
    base: viteEnv.VITE_BASE_URL,
    server: {
      host: '0.0.0.0',
      proxy: viteEnv.VITE_BASE_URL_API
        ? {
            '^/proxyApi/.*': {
              target: viteEnv.VITE_BASE_URL_API,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/proxyApi/, '')
            }
          }
        : {}
    },
    build: {
      chunkSizeWarningLimit: 2 * 1024,
      rolldownOptions: {
        checks: {
          ineffectiveDynamicImport: false,
          pluginTimings: false
        },
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
          codeSplitting: {
            groups: [
              {
                name: 'vue',
                test: /node_modules[\\/](vue|vue-router|pinia|@vue)[\\/]/,
                priority: 20
              },
              {
                name: 'icon',
                test: /node_modules.*@element-plus[\\/]icons-vue/,
                priority: 19
              },
              { name: 'ui', test: /node_modules.*element-plus/, priority: 15 },
              {
                name: 'viewer',
                test: /node_modules[\\/](v-viewer|viewerjs)[\\/]/,
                priority: 15
              },
              { name: 'echarts', test: /node_modules.*echarts/, priority: 15 },
              { name: 'vditor', test: /node_modules.*vditor/, priority: 15 },
              { name: 'lottie', test: /node_modules.*lottie-web/, priority: 15 }
            ]
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 编译所有应用 scss 变量的组件
    css: {
      preprocessorOptions: {
        scss: {
          // 修改element变量、全局导入scss变量
          additionalData: `
            @use "@/assets/styles/element.scss" as *;
            @use "@/assets/styles/variables.scss" as *;
            @use "@/assets/styles/mixins.scss" as *;
          `
        }
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild)
  }
}
