// TODO: https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
// Vite 默认的浏览器支持基线是Native ESM、原生 ESM 动态导入、import.meta.
// 该插件为在构建生产时不支持这些功能的旧版浏览器提供支持
import legacy from '@vitejs/plugin-legacy'

export const useLegacy = () =>
  legacy({
    targets: ['defaults', 'not IE 11']
  })
