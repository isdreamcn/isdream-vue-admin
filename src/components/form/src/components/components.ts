import type { FormFieldOptions } from '../form'
import { buildProps, definePropType } from '@/utils'

export const formComponentsProps = buildProps({
  modelValue: {
    type: definePropType<any>([String, Number, Array])
  },
  options: {
    type: definePropType<FormFieldOptions[]>(Array),
    default: () => []
  }
} as const)

export const formComponentsEmits = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  'update:modelValue': (val: any) => true
}
