# Table

> 基于[ElTable](https://element-plus.org/zh-CN/component/table.html)

## API

### Table 属性

| 属性名               | 说明                                                                | 类型                                                  | 预设值 |
| -------------------- | ------------------------------------------------------------------- | ----------------------------------------------------- | ------ |
| series               | 显示序号列                                                          | `boolean`                                             | true   |
| **columns**          | 表格列                                                              | **TableColumn[]**                                     | --     |
| selectable           | 决定 `CheckBox` 是否可以勾选, `() => true` 可以勾选                 | `(row: any, index: number) => boolean`                | --     |
| selectKeys           | 多选框列，`v-model:selectKeys`                                      | `array`                                               | --     |
| selectKeysKeep       | 切换页码/http 调用/data 更新, 不会根据 table 数据，过滤`selectKeys` | `boolean`                                             | false  |
| rowKey               | 行数据的 Key                                                        | `string\|((row: Record<string, any>) => any`          | id     |
| **paginationConfig** | 分页器                                                              | `false` \| **TablePaginationOptions**                 | --     |
| loading              | table 显示加载动画                                                  | `boolean`                                             | --     |
| data                 | table 数据，会默认分页，http 和 data 同时设置，使用 http            | `array`                                               | --     |
| httpLazy             | http 不会立即执行、params 发生变化、isReload = true 调用 http       | `boolean`                                             | false  |
| isReload             | 重新请求 http，`v-model:isReload`                                   | `boolean`                                             | false  |
| http                 | 获取 data 的接口                                                    | `(params: any) => Promise<{data: [], count: number}>` | --     |
| params               | http 额外参数                                                       | `object`                                              | --     |

#### Table-columns (TableColumn)

| 属性名       | 说明                         | 类型                                                              | 预设值 |
| ------------ | ---------------------------- | ----------------------------------------------------------------- | ------ |
| key          | 唯一值                       | `string`                                                          | --     |
| label        | 列标签                       | `string`                                                          | --     |
| slot         | 开启 `name=key` 的插槽       | `boolean`                                                         | false  |
| width        | 宽度                         | `number`                                                          | false  |
| fixed        | 列固定                       | `left\|right`                                                     | --     |
| attrs        | `ElTable-column 属性`        | `object`                                                          | --     |
| customRender | 自定义渲染内容、并会开启插槽 | `(value: any, row: Record<string, any>, index: number) => string` | --     |

#### Table-paginationConfig (TablePaginationOptions)

| 属性名      | 说明           | 类型       | 预设值       |
| ----------- | -------------- | ---------- | ------------ |
| currentPage | 当前页         | `number`   | 1            |
| pageSize    | 每页条数       | `number`   | 10           |
| pageSizes   | 每页条数可选项 | `number[]` | [10, 20, 30] |

### Table 插槽

| 插槽名                  | 说明                                         |
| ----------------------- | -------------------------------------------- |
| extra                   | 额外内容、table 右上角，推荐用于放置操作按钮 |
| **[Table-columns key]** | Table-columns slot 为 true 时开启            |
