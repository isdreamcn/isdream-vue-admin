import type Upload from './upload.vue'
import type { ExtractPropTypes } from 'vue'
import type {
  UploadUserFile as ElUploadUserFile,
  UploadFile
} from 'element-plus'
import { buildProps, definePropType, isArray } from '@/utils'

export type UploadUserFile = ElUploadUserFile

export type UploadHttp = (formData: FormData) => Promise<{
  data: {
    url: string
    name: string
  }
}>

export type UploadOnPreview = (file: UploadFile) => void

export interface UploadRule {
  validator: (file: File) => boolean
  message: string
}

export const uploadProps = buildProps({
  modelValue: {
    type: definePropType<UploadUserFile[]>(Array),
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: true
  },
  // 接收上传的文件类型
  accept: {
    type: definePropType<'all' | string>(String),
    default: 'all'
  },
  // 文件数量限制
  max: {
    type: Number,
    default: Infinity
  },
  // 文件大小限制(byte)
  maxSize: {
    type: Number,
    default: Infinity
  },
  listType: {
    type: definePropType<'text' | 'picture' | 'picture-card'>(String),
    default: 'picture'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  rules: {
    type: definePropType<UploadRule[]>(Array),
    default: () => []
  },
  // 预览功能
  preview: {
    type: definePropType<UploadOnPreview | boolean>([Function, Boolean]),
    default: true
  },
  http: {
    type: definePropType<UploadHttp>(Function),
    required: true
  },
  httpFileKey: {
    type: String,
    default: 'file'
  },
  // 移除上传失败的文件
  removeFail: {
    type: Boolean,
    default: true
  },
  // 显示本次上传结果(上传成功/上传失败)
  showMessage: {
    type: Boolean,
    default: true
  }
} as const)

export const uploadEmits = {
  'update:modelValue': (fileList: UploadUserFile[]) => isArray(fileList),
  change: (fileList: UploadUserFile[]) => isArray(fileList)
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type UploadEmits = typeof uploadEmits

export type UploadInstance = InstanceType<typeof Upload>
