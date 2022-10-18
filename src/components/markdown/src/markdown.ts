import type Markdown from './markdown.vue'
import type { ExtractPropTypes } from 'vue'
import Vditor from 'vditor'
import { buildProps, definePropType } from '@/utils'
import { toolbar } from './vditor/vditor'

export type MarkdownUpload = (formData: FormData) => Promise<{
  data: {
    url: string
    name: string
  }
}>

export const markdownProps = buildProps({
  options: {
    type: definePropType<Record<string, any>>(Object),
    default: () => {}
  },
  modelValue: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 360
  },
  toolbar: {
    type: definePropType<string[]>(Array),
    default: toolbar
  },
  upload: {
    type: definePropType<MarkdownUpload | false>([Function, Boolean]),
    default: false
  },
  uploadFileKey: {
    type: String,
    default: 'file'
  }
} as const)
export const markdownEmits = {
  change: (content: string) => typeof content === 'string',
  'update:modelValue': (content: string) => typeof content === 'string',
  getVditor: (vditor: Vditor) => vditor instanceof Vditor
}

export type MarkdownProps = ExtractPropTypes<typeof markdownProps>
export type MarkdownEmits = typeof markdownEmits

export type MarkdownInstance = InstanceType<typeof Markdown>
