import type { ECharts } from 'echarts/core'

// TODO: https://echarts.apache.org/zh/api.html#events
const validEvents = [
  'onClick',
  'onDblclick',
  'onMousedown',
  'onMousemove',
  'onMouseup',
  'onMouseover',
  'onMouseout',
  'onGlobalout',
  'onContextmenu',
  'onHighlight',
  'onDownplay',
  'onSelectchanged',
  'onLegendselectchanged',
  'onLegendselected',
  'onLegendunselected',
  'onLegendselectall',
  'onLegendinverseselect',
  'onLegendscroll',
  'onDatazoom',
  'onDatarangeselected',
  'onGraphroam',
  'onGeoroam',
  'onTreeroam',
  'onTimelinechanged',
  'onTimelineplaychanged',
  'onRestore',
  'onDataviewchanged',
  'onMagictypechanged',
  'onGeoselectchanged',
  'onGeoselected',
  'onGeounselected',
  'onAxisareaselected',
  'onBrush',
  'onBrushEnd',
  'onBrushselected',
  'onGlobalcursortaken',
  'onRendered',
  'onFinished'
]

export const useHandlers = (chart: ECharts, listeners: Record<string, any>) => {
  const set = new Set(validEvents)
  Object.keys(listeners)
    .filter((key) => set.has(key))
    .forEach((key: string) => {
      chart.on(key.substring(2), listeners[key])
    })
}
