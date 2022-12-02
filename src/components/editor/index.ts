import { withInstall } from '@/utils'
import { defineAsyncComponent } from 'vue'

// 使用异步组件，用于打包时分包
export const MEditor = withInstall(
  defineAsyncComponent(() => import('./src/editor.vue')),
  {},
  'MEditor'
)
export default MEditor

export * from './src/editor'
