import * as echarts from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Svg 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
// TODO: https://github.com/apache/echarts-handbook/blob/master/contents/en/best-practices/canvas-vs-svg.md
import { SVGRenderer } from 'echarts/renderers'

import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption
} from 'echarts/charts'
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption
} from 'echarts/components'
import type { ComposeOption } from 'echarts/core'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

let usedECharts = false

export const useECharts = () => {
  if (usedECharts) {
    return
  }
  usedECharts = true
  // 注册必须的组件
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LineChart,
    LabelLayout,
    UniversalTransition,
    SVGRenderer
  ])
}
