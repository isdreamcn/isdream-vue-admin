import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import path from 'path'

import { wrapperLoadEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugins'
const pathResolve = (dir: string) => {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root) as LoadViteEnv
  const viteEnv = wrapperLoadEnv(env)
  const isBuild = command === 'build'

  return {
    base: '/',
    server: {
      host: '0.0.0.0',
      proxy: !viteEnv.VITE_USE_MOCK
        ? {
            '^/api/.*': {
              target: viteEnv.VITE_BASE_URL_API,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
            }
          }
        : {}
    },
    resolve: {
      alias: {
        '@': pathResolve('src'),
        '#': pathResolve('typings'),
        '~': pathResolve('./')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/element.scss" as *;`
        }
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild)
  }
}
