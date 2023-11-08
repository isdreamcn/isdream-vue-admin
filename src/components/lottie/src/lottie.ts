import type { ExtractPropTypes } from 'vue'
import type Lottie from './lottie.vue'
import { AnimationItem, AnimationConfig } from 'lottie-web'
import { buildProps, definePropType, isNil } from '@/utils'

export type LottieConfig = AnimationConfig

export const lottieProps = buildProps({
  config: {
    type: definePropType<LottieConfig>(Object),
    default: () => ({})
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  },
  data: {
    type: Object,
    required: true
  }
} as const)

export const lottieEmits = {
  created: (anim: AnimationItem) => !isNil(anim)
}

export type LottieProps = ExtractPropTypes<typeof lottieProps>
export type LottieEmits = typeof lottieEmits

export type LottieInstance = InstanceType<typeof Lottie>
