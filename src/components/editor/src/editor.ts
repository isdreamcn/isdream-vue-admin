import type Editor from './editor.vue'
import type { ExtractPropTypes } from 'vue'
import { Editor as TinymceEditor, RawEditorSettings } from 'tinymce'
import { buildProps, definePropType, isNil, isString } from '@/utils'
import { toolbar, plugins } from './tinymce/tinymce'
import { uploadCommon } from '@/api/common'

type EditorUpload = typeof uploadCommon

export const editorProps = buildProps({
  options: {
    type: definePropType<Partial<RawEditorSettings>>(Object),
    default: () => ({})
  },
  modelValue: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
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
  upload: {
    type: definePropType<EditorUpload | false>([Function, Boolean]),
    default: () => uploadCommon
  },
  uploadFileKey: {
    type: String,
    default: 'file'
  }
} as const)

export const editorEmits = {
  change: (content: string) => isString(content),
  'update:modelValue': (content: string) => isString(content),
  inited: (editor: TinymceEditor) => editor instanceof TinymceEditor,
  'init-error': (err: any) => !isNil(err)
}

export type EditorProps = ExtractPropTypes<typeof editorProps>
export type EditorEmits = typeof editorEmits

export type EditorInstance = InstanceType<typeof Editor>
