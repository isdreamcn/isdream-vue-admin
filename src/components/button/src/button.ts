import type { ExtractPropTypes } from 'vue'
import type { ElMessageBoxOptions, UseTooltipProps } from 'element-plus'
import { buildProps, definePropType } from '@/utils'

type ButtonHttp = () => Promise<unknown> | void

export const buttonProps = buildProps({
  // 是否点击时弹出二次确认；danger/warning 类型默认开启，传 null 强制关闭
  pop: {
    type: definePropType<boolean | null>([Boolean, null]),
    default: undefined
  },
  // 二次确认弹窗的提示文案
  message: String,
  // ElMessageBox 其余配置透传
  messageBoxProps: {
    type: definePropType<ElMessageBoxOptions>(Object)
  },
  // 悬浮提示文案
  tooltip: String,
  // ElTooltip 其余配置透传
  tooltipProps: {
    type: definePropType<Partial<UseTooltipProps>>(Object)
  },
  // 外部 loading，与内部 http loading 取或
  loading: {
    type: Boolean,
    default: false
  },
  // 传入后点击自动执行并管理 loading，此时不触发 click 事件
  http: {
    type: definePropType<ButtonHttp>(Function)
  },
  /**
   * 置灰按钮点击提示：传入后 disabled 不再透传给底层按钮，
   * 改为保持置灰外观且可点击，点击时弹出该文案提示
   */
  disabledTip: String
} as const)

export const buttonEmits = {
  click: (event: MouseEvent) => event instanceof MouseEvent,
  cancel: () => true,
  error: (_error: unknown) => true
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits
