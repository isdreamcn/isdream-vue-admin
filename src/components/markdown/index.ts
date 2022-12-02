import { withInstall } from '@/utils'
import { defineAsyncComponent } from 'vue'

export const MMarkdownView = withInstall(
  defineAsyncComponent(() => import('./src/markdownView.vue')),
  {},
  'MMarkdownView'
)

export const MMarkdown = withInstall(
  defineAsyncComponent(() => import('./src/markdown.vue')),
  {},
  'MMarkdown'
)

export default MMarkdown

export * from './src/markdown'
