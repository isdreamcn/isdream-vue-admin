import type Markdown from './markdown.vue'
import type { ExtractPropTypes } from 'vue'
import type Vditor from 'vditor'
import { buildProps, definePropType } from '@/utils'
import { uploadCommon } from '@/api/common'

type MarkdownUpload = typeof uploadCommon

export const markdownProps = buildProps({
  options: {
    type: definePropType<Partial<IOptions>>(Object),
    default: () => ({})
  },
  modelValue: {
    type: String,
    default: ''
  },
  upload: {
    type: definePropType<MarkdownUpload | false>([Function, Boolean]),
    default: () => uploadCommon
  },
  uploadFileKey: {
    type: String,
    default: 'file'
  },
  // TODO https://www.w3schools.com/tags/att_input_accept.asp
  uploadFileAccept: {
    type: String,
    default: 'image/*'
  }
} as const)

export const markdownEmits = {
  change: (content: string) => typeof content === 'string',
  'update:modelValue': (content: string) => typeof content === 'string',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getVditor: (vditor: Vditor) => true
}

export type MarkdownProps = ExtractPropTypes<typeof markdownProps>
export type MarkdownEmits = typeof markdownEmits

export type MarkdownInstance = InstanceType<typeof Markdown>
