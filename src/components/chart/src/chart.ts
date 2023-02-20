import type { ExtractPropTypes } from 'vue'
import type { ECharts } from 'echarts/core'
import type { ECOption } from '@/plugins'
import type Chart from './chart.vue'
import { buildProps, definePropType } from '@/utils'

export const chartProps = buildProps({
  options: {
    type: definePropType<ECOption>(Object),
    required: true
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  },
  lazy: {
    type: Boolean,
    default: false
  }
} as const)

export const chartEmits = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init: (chart: ECharts) => true
}

export type ChartsProps = ExtractPropTypes<typeof chartProps>
export type ChartsEmits = typeof chartEmits

export type ChartOptions = ChartsProps['options']

export type ChartsInstance = InstanceType<typeof Chart>
