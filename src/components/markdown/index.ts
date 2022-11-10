import { withInstall } from '@/utils'
import { defineAsyncComponent } from 'vue'

export const MMarkdownView = withInstall(
  defineAsyncComponent(() => import('./src/markdownView.vue'))
)

export const MMarkdown = withInstall(
  defineAsyncComponent(() => import('./src/markdown.vue')),
  { MMarkdownView }
)
export default MMarkdown

export * from './src/markdown'
