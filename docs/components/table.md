# Table 表格

基于 [ElTable](https://element-plus.org/zh-CN/component/table.html) 封装，集成分页、多选、远程数据加载等功能。

## 基础用法

<<< ../../src/views/examples/components/table/table.vue

列配置：

<<< ../../src/views/examples/components/table/config.ts

## API

### Table 属性

| 属性名               | 说明                                                | 类型                                             | 默认值  |
| -------------------- | --------------------------------------------------- | ------------------------------------------------ | ------- |
| series               | 显示序号列                                          | `boolean`                                        | `true`  |
| **columns**          | 表格列配置                                          | **TableColumn[]**                                | —       |
| selectable           | 决定 CheckBox 是否可勾选                            | `(row: any, index: number) => boolean`           | —       |
| selectKeys           | 多选框 v-model                                      | `array`                                          | —       |
| selectKeysKeep       | 切换页码时不根据 table 数据过滤 selectKeys          | `boolean`                                        | `false` |
| rowKey               | 行数据的 Key                                        | `string \| ((row) => any)`                       | `'id'`  |
| **paginationConfig** | 分页器配置，设为 `false` 关闭分页                   | `false \| TablePaginationOptions`                | —       |
| loading              | 显示加载动画                                        | `boolean`                                        | —       |
| data                 | 静态数据（http 和 data 同时设置时使用 http）        | `array`                                          | `[]`    |
| httpLazy             | http 不立即执行，params 变化或 isReload=true 时调用 | `boolean`                                        | `false` |
| isReload             | 重新请求 http（v-model）                            | `boolean`                                        | `false` |
| http                 | 获取数据的接口                                      | `(params) => Promise<{data: [], count: number}>` | —       |
| params               | http 额外参数                                       | `object`                                         | `{}`    |

### TableColumn

| 属性名       | 说明                   | 类型                            | 默认值  |
| ------------ | ---------------------- | ------------------------------- | ------- |
| key          | 唯一值                 | `string`                        | —       |
| label        | 列标签                 | `string`                        | —       |
| slot         | 开启 `name=key` 的插槽 | `boolean`                       | `false` |
| width        | 列宽度                 | `number`                        | —       |
| fixed        | 列固定                 | `'left' \| 'right'`             | —       |
| attrs        | ElTableColumn 属性     | `object`                        | —       |
| customRender | 自定义渲染内容         | `(value, row, index) => string` | —       |
| children     | 多级表头               | **TableColumn[]**               | —       |

### TablePaginationOptions

| 属性名      | 说明           | 类型       | 默认值         |
| ----------- | -------------- | ---------- | -------------- |
| currentPage | 当前页         | `number`   | `1`            |
| pageSize    | 每页条数       | `number`   | `10`           |
| pageSizes   | 每页条数可选项 | `number[]` | `[10, 20, 30]` |

### Table 插槽

| 插槽名           | 说明                                         |
| ---------------- | -------------------------------------------- |
| extra            | 额外内容，table 右上角，推荐用于放置操作按钮 |
| **[column key]** | TableColumn slot 为 true 时开启              |
