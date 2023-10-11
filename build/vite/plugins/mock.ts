// TODO:https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md
import { viteMockServe } from 'vite-plugin-mock'

export const useMock = (isBuild: boolean) => {
  return [
    viteMockServe({
      mockPath: 'mock',
      ignore: /^(index|_)/,
      // false 将禁用 mock 功能
      localEnabled: !isBuild,
      prodEnabled: isBuild,
      injectCode: `
      import { setupProdMockServer } from '../mock';
      setupProdMockServer();
    `
    })
  ]
}
