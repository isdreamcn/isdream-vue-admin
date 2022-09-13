import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'

import { useAutoImportComponents } from './autoImportComponents'
import { useMock } from './mock'
import { useHtmlDev } from './htmlDev'

export const createVitePlugins = (viteEnv: DefineEnv, isBuild: boolean) => {
  const plugins: PluginOption[] = [vue(), DefineOptions()]

  plugins.push(useAutoImportComponents())
  plugins.push(useMock(viteEnv, isBuild))
  plugins.push(useHtmlDev())

  return plugins
}
