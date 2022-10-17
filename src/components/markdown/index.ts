import { withInstall } from '@/utils'
import Markdown from './src/markdown.vue'
import MarkdownView from './src/markdownView.vue'

export const MMarkdownView = withInstall(MarkdownView)

export const MMarkdown = withInstall(Markdown, { MarkdownView })
export default MMarkdown

export * from './src/markdown'
