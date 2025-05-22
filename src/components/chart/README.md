# Chart

> 基于[echrts](https://echarts.apache.org/zh/index.html)

## API

### Chart 属性

| 属性名  | 说明                                           | 类型       | 预设值 |
| ------- | ---------------------------------------------- | ---------- | ------ |
| option  | ECharts Option                                | `ECOption` | --     |
| width   | 宽度                                           | `string`   | 100%   |
| height  | 高度                                           | `string`   | 100%   |
| lazy    | 是否直接渲染, 为 true 时, options 改变才会渲染 | `boolean`  | false  |

### Chart 事件

| 事件名 | 说明             | 类型                       |
| ------ | ---------------- | -------------------------- |
| init   | ECharts Instance | `(chart: ECharts) => void` |

### Exposes

| 名称     | 说明                | 类型          |
| -------- | ------------------- | ------------- |
| chart    | ECharts Instance    | `ECharts`     |
| chartRef | 渲染 ECharts 的容器 | `HTMLElement` |
