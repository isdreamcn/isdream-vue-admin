import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'

import { useAutoImportComponents } from './autoImportComponents'
import { useMock } from './mock'
import { useHtmlDev } from './htmlDev'
import { useGzip } from './useGzip'
import { rollupVisualizer } from './rollupVisualizer'

export const createVitePlugins = (viteEnv: DefineEnv, isBuild: boolean) => {
  const plugins: PluginOption[] = [vue(), DefineOptions()]

  plugins.push(useAutoImportComponents())
  plugins.push(useMock(viteEnv, isBuild))
  plugins.push(useHtmlDev())
  plugins.push(useGzip())
  plugins.push(rollupVisualizer())

  return plugins
}
