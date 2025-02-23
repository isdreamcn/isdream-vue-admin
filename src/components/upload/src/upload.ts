import type Upload from './upload.vue'
import type { ExtractPropTypes } from 'vue'
import type { UploadUserFile as ElUploadUserFile } from 'element-plus'
import { buildProps, definePropType, isArray } from '@/utils'
import { uploadCommon, CommonUploadFile } from '@/api/common'

export type UploadFile = ElUploadUserFile & {
  url: string
  response?: CommonUploadFile
}
type UploadHttp = typeof uploadCommon
type UploadOnPreview = (file: UploadFile) => void

export interface UploadRule {
  validator: (file: File) => boolean
  message: string
}

export const uploadProps = buildProps({
  modelValue: {
    type: definePropType<UploadFile[]>(Array),
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: true
  },
  // 接收上传的文件类型
  accept: {
    type: String,
    default: 'all'
  },
  // 文件数量限制
  max: {
    type: Number,
    default: Infinity
  },
  // 文件大小限制(MB)
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
    default: uploadCommon
  },
  httpFileKey: {
    type: String,
    default: 'file'
  },
  // 显示本次上传结果(上传成功/上传失败)
  showMessage: {
    type: Boolean,
    default: true
  }
} as const)

export const uploadEmits = {
  'update:modelValue': (fileList: UploadFile[]) => isArray(fileList),
  change: (fileList: UploadFile[]) => isArray(fileList)
}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type UploadEmits = typeof uploadEmits

export type UploadInstance = InstanceType<typeof Upload>
