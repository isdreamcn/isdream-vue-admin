import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'

import { useAutoImportComponents } from './autoImportComponents'
import { useMock } from './mock'
import { useHtmlDev } from './htmlDev'
import { useLegacy } from './legacy'
import { useGzip } from './useGzip'
import { rollupVisualizer } from './rollupVisualizer'

export const createVitePlugins = (viteEnv: DefineEnv, isBuild: boolean) => {
  const plugins: PluginOption[] = [vue(), DefineOptions()]

  plugins.push(useAutoImportComponents(isBuild))
  plugins.push(useHtmlDev())

  if (viteEnv.VITE_USE_MOCK) {
    plugins.push(useMock(isBuild))
  }
  if (viteEnv.VITE_BUILD_LEGACY) {
    plugins.push(useLegacy())
  }
  if (viteEnv.VITE_BUILD_GZIP) {
    plugins.push(useGzip())
  }
  if (viteEnv.VITE_BUILD_ROLLUP_VISUALIZER) {
    plugins.push(rollupVisualizer() as PluginOption)
  }

  return plugins
}
