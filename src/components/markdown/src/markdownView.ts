import type MarkdownView from './markdownView.vue'
import type { ExtractPropTypes } from 'vue'
import { buildProps, definePropType } from '@/utils'

export const markdownViewProps = buildProps({
  value: {
    type: String,
    default: ''
  },
  options: {
    type: definePropType<Partial<IPreviewOptions>>(Object),
    default: () => ({})
  }
} as const)

export type MarkdownViewProps = ExtractPropTypes<typeof markdownViewProps>

export type MarkdownViewInstance = InstanceType<typeof MarkdownView>
