import type Editor from './editor.vue'
import type { ExtractPropTypes } from 'vue'
import type { RawEditorSettings } from 'tinymce'
import { buildProps, definePropType } from '@/utils'
import { toolbar, plugins } from './tinymce/tinymce'

export type EditorUpload = (formData: FormData) => Promise<any>

export const editorProps = buildProps({
  options: {
    type: definePropType<Partial<RawEditorSettings>>(Object),
    default: {}
  },
  modelValue: {
    type: String,
    default: ''
  },
  toolbar: {
    type: definePropType<string[]>(Array),
    default: toolbar
  },
  plugins: {
    type: definePropType<string[]>(Array),
    default: plugins
  },
  height: {
    type: definePropType<string | number>([Number, String]),
    required: false,
    default: 400
  },
  width: {
    type: definePropType<string | number>([Number, String]),
    required: false,
    default: 'auto'
  },
  upload: {
    type: definePropType<EditorUpload | false>([Function, Boolean]),
    default: false
  },
  uploadFileKey: {
    type: String,
    default: 'file'
  }
} as const)
export const editorEmits = {
  change: (content: string) => typeof content === 'string',
  'update:modelValue': (content: string) => typeof content === 'string',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  inited: (val: any) => true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  'init-error': (err: any) => true
}

export type EditorProps = ExtractPropTypes<typeof editorProps>
export type EditorEmits = typeof editorEmits

export type EditorInstance = InstanceType<typeof Editor>
