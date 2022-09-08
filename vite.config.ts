import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import path from 'path'

import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugins'
const pathResolve = (dir: string) => {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root) as LoadViteEnv
  const viteEnv = wrapperEnv(env)
  const isBuild = command === 'build'

  return {
    base: '/',
    server: {
      host: '0.0.0.0'
    },
    resolve: {
      alias: {
        '@': pathResolve('src')
      }
    },
    plugins: createVitePlugins(viteEnv, isBuild)
  }
}
