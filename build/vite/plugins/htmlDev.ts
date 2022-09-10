// TODO:https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
import { createHtmlPlugin } from 'vite-plugin-html'

export const useHtmlDev = () => {
  return [
    createHtmlPlugin({
      inject: {}
    })
  ]
}
