import type { App } from 'vue'

export type AppUsePlugin = (app: App<Element>) => void
export type { ECOption } from './echarts'
