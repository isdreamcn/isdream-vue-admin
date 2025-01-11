import type { ExtractPropTypes } from 'vue'
import type Loading from './loading.vue'
import { buildProps } from '@/utils'

export const loadingProps = buildProps({
  loading: {
    type: Boolean,
    default: false
  },
  zIndex: {
    type: Number,
    default: 2147483646
  }
} as const)

export type LoadingProps = ExtractPropTypes<typeof loadingProps>

export type LoadingInstance = InstanceType<typeof Loading>
