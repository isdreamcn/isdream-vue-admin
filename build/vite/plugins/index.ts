import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'

import { useAutoImportComponents } from './autoImportComponents'
import { useGzip } from './useGzip'
import { rollupVisualizer } from './rollupVisualizer'

export const createVitePlugins = (viteEnv: DefineEnv, isBuild: boolean) => {
  const plugins: PluginOption[] = [vue()]

  plugins.push(useAutoImportComponents(isBuild))

  if (viteEnv.VITE_BUILD_GZIP) {
    plugins.push(useGzip())
  }
  if (viteEnv.VITE_BUILD_ROLLUP_VISUALIZER) {
    plugins.push(rollupVisualizer() as PluginOption)
  }

  return plugins
}
