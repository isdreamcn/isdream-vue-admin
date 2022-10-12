import type { ExtractPropTypes } from 'vue'
import type Icon from './icon.vue'
import { buildProps } from '@/utils'

export const iconProps = buildProps({
  size: Number,
  color: String,
  name: {
    type: String,
    required: true,
    default: '',
    validator: (val: string) => val.startsWith('icon') || val.startsWith('Icon')
  }
} as const)

export type IconProps = ExtractPropTypes<typeof iconProps>

export type IconInstance = InstanceType<typeof Icon>
