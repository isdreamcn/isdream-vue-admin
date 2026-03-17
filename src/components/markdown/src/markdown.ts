import type Markdown from './markdown.vue'
import type { ExtractPropTypes } from 'vue'
import Vditor from 'vditor'
import { buildProps, definePropType, isString } from '@/utils'
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
  // @see https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Attributes/accept
  uploadFileAccept: {
    type: String,
    default: 'image/*'
  }
} as const)

export const markdownEmits = {
  change: (content: string) => isString(content),
  'update:modelValue': (content: string) => isString(content),
  getVditor: (vditor: Vditor) => vditor instanceof Vditor
}

export type MarkdownProps = ExtractPropTypes<typeof markdownProps>
export type MarkdownEmits = typeof markdownEmits

export type MarkdownInstance = InstanceType<typeof Markdown>
