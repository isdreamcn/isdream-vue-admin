import type A from './a.vue'
import type { ExtractPropTypes } from 'vue'
import { buildProps, definePropType } from '@/utils'

export const aProps = buildProps({
  type: {
    type: definePropType<'primary' | 'success' | 'warning' | 'danger' | 'info'>(
      String
    ),
    default: 'primary'
  },
  pop: {
    type: definePropType<boolean | undefined>([Boolean, undefined]),
    default: undefined
  },
  popTitle: {
    type: String,
    default: '确认删除吗？'
  },
  submitText: {
    type: String,
    default: '是'
  },
  cancelText: {
    type: String,
    default: '否'
  }
} as const)

export const aEmits = {
  click: (evt: Event) => evt instanceof Event
}

export type AProps = ExtractPropTypes<typeof aProps>
export type AEmits = typeof aEmits

export type AInstance = InstanceType<typeof A>
