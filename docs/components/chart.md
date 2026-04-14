# Chart 图表

基于 [ECharts](https://echarts.apache.org/zh/index.html) 封装，支持响应式图表渲染。

## 基础用法

<<< ../../src/views/examples/components/chart/chart.vue

## API

### Chart 属性

| 属性名     | 说明                                         | 类型       | 默认值   |
| ---------- | -------------------------------------------- | ---------- | -------- |
| **option** | ECharts 配置项                               | `ECOption` | —        |
| width      | 图表宽度                                     | `string`   | `'100%'` |
| height     | 图表高度                                     | `string`   | `'100%'` |
| lazy       | 是否延迟渲染（为 true 时 option 变化才渲染） | `boolean`  | `false`  |

### Chart 事件

| 事件名 | 说明           | 类型                       |
| ------ | -------------- | -------------------------- |
| init   | 图表初始化完成 | `(chart: ECharts) => void` |

### Exposes

| 名称     | 说明         | 类型          |
| -------- | ------------ | ------------- |
| chart    | ECharts 实例 | `ECharts`     |
| chartRef | 渲染容器 DOM | `HTMLElement` |
