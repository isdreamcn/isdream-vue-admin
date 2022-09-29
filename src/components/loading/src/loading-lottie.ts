import type { ExtractPropTypes } from 'vue'
import type LoadingLottie from './loading-lottie.vue'
import { buildProps } from '@/utils'
import { loadingProps } from './loading'

export const loadingLottieProps = buildProps({
  ...loadingProps
} as const)

export type LoadingLottieProps = ExtractPropTypes<typeof loadingLottieProps>
export type LoadingLottieInstance = InstanceType<typeof LoadingLottie>
