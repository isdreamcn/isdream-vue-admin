import { buildProps, definePropType } from '@/utils'

import type { ExtractPropTypes } from 'vue'
import { AnimationItem, AnimationConfig } from 'lottie-web'
import type Lottie from './lottie.vue'

export const lottieProps = buildProps({
  config: {
    type: definePropType<AnimationConfig>(Object),
    default: () => {}
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  created: (anim: AnimationItem) => true
}

export type LottieProps = ExtractPropTypes<typeof lottieProps>
export type LottieEmits = typeof lottieEmits

export type LottieInstance = InstanceType<typeof Lottie>
