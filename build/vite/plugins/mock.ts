// TODO:https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md
import { viteMockServe } from 'vite-plugin-mock'

export const useMock = (viteEnv: ViteEnv) => {
  return [
    viteMockServe({
      mockPath: 'mock',
      ignore: /^index/,
      // false 将禁用 mock 功能
      localEnabled: viteEnv.VITE_USE_MOCK,
      prodEnabled: viteEnv.VITE_USE_MOCK,
      injectCode: `
      import { setupProdMockServer } from '../mock';
      setupProdMockServer();
    `
    })
  ]
}
