// TODO:https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md
import { viteMockServe } from 'vite-plugin-mock'

export const useMock = (viteEnv: DefineEnv, isBuild: boolean) => {
  return [
    viteMockServe({
      mockPath: 'mock',
      ignore: /^(index|_)/,
      // false 将禁用 mock 功能
      localEnabled: viteEnv.VITE_USE_MOCK && !isBuild,
      prodEnabled: viteEnv.VITE_USE_MOCK && isBuild,
      injectCode: `
      import { setupProdMockServer } from '../mock';
      setupProdMockServer();
    `
    })
  ]
}
