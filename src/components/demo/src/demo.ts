import type { ExtractPropTypes } from 'vue'
import type Demo from './demo.vue'
import { buildProps } from '@/utils'

/**
 * Demo 组件 Props 定义
 *
 * buildProps 仅处理以下五个标准字段：type、required、default、values、validator
 * 其他非标准字段会被忽略
 */
export const demoProps = buildProps({
  /** 是否禁用 */
  disabled: Boolean,
  /**
   * 按钮类型
   * - values: 限制可选值范围，buildProps 会自动生成 validator 进行校验
   */
  type: {
    type: String,
    values: ['a', 'b'],
    default: 'a',
  },
} as const)

export const demoEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type DemoProps = ExtractPropTypes<typeof demoProps>
export type DemoEmits = typeof demoEmits

export type DemoType = DemoProps['type']

export type DemoInstance = InstanceType<typeof Demo>
