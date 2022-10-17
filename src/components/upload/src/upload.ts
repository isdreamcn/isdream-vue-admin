import type Upload from './upload.vue'
import type { ExtractPropTypes } from 'vue'
import { buildProps, definePropType } from '@/utils'

export const uploadProps = buildProps({} as const)
export const uploadEmits = {}

export type UploadProps = ExtractPropTypes<typeof uploadProps>
export type UploadEmits = typeof uploadEmits

export type UploadInstance = InstanceType<typeof Upload>
