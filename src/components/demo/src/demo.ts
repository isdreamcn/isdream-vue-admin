import type { ExtractPropTypes } from 'vue'
import type Demo from './demo.vue'
import { buildProps } from '@/utils'

export const demoProps = buildProps({
  disabled: Boolean,
  type: {
    type: String,
    values: ['a', 'b'],
    default: 456,
    demo: 123
  }
} as const)

export const demoEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type DemoProps = ExtractPropTypes<typeof demoProps>
export type DemoEmits = typeof demoEmits

export type DemoType = DemoProps['type']

export type DemoInstance = InstanceType<typeof Demo>
