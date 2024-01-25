import type { ExtractPropTypes } from 'vue'
import type { ECharts } from 'echarts/core'
import type { ECOption } from '@/plugins'
import type Chart from './chart.vue'
import { buildProps, definePropType, isNil } from '@/utils'

export type ChartOptions =
  | ECOption
  | {
      [x: string]: unknown
      [x: number]: unknown
    }

export const chartProps = buildProps({
  options: {
    type: definePropType<ChartOptions>(Object),
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
  init: (chart: ECharts) => !isNil(chart)
}

export type ChartsProps = ExtractPropTypes<typeof chartProps>
export type ChartsEmits = typeof chartEmits

export type ChartsInstance = InstanceType<typeof Chart>
