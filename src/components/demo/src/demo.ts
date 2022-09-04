/*
 * @Description:
 * @Author: mtm
 * @Date: 2022-09-04 11:08:49
 * @LastEditTime: 2022-09-04 14:15:49
 * @LastEditors: mtm
 */
import { buildProps } from '@/utils/components/props'

import type { ExtractPropTypes } from 'vue'
import type Demo from './demo.vue'

export const demoProps = buildProps({
  disabled: Boolean,
  type: {
    type: String,
    values: ['a, b'],
    default: 456,
    demo: 123
  }
})

export const demoEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type DemoProps = ExtractPropTypes<typeof demoProps>
export type DemoEmits = typeof demoEmits

export type DemoType = DemoProps['type']

export type DemoInstance = InstanceType<typeof Demo>
