import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'

import { wrapperLoadViteEnv, dependenciesChunks } from './build/utils'
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
      chunkSizeWarningLimit: 5 * 1024,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            // 最小 ...dependenciesChunks(['vue'])
            ...dependenciesChunks([
              'vue',
              'vue-router',
              'pinia',
              'animate.css',
              'normalize.css',
              'lodash-unified',
              '@vue/shared'
            ])
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
            @use "@/assets/styles/mxins.scss" as *;
          `
        }
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild)
  }
}
