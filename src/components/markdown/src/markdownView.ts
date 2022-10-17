import type MarkdownView from './markdownView.vue'
import type { ExtractPropTypes } from 'vue'
import { buildProps } from '@/utils'

export const markdownViewProps = buildProps({
  value: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 360
  }
} as const)

export type MarkdownViewProps = ExtractPropTypes<typeof markdownViewProps>

export type MarkdownViewInstance = InstanceType<typeof MarkdownView>
