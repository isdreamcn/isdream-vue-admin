# SearchTree 搜索树

基于 [ElTree](https://element-plus.org/zh-CN/component/tree.html) 封装，集成搜索过滤功能，支持单选和多选。

## 基础用法

<<< ../../src/views/examples/components/searchTree/searchTree.vue

## API

### SearchTree 属性

| 属性名        | 说明                                                    | 类型                 | 默认值    |
| ------------- | ------------------------------------------------------- | -------------------- | --------- |
| modelValue    | v-model，show-checkbox 时为勾选的节点，否则为选中的节点 | `any \| any[]`       | —         |
| show-checkbox | 节点是否可被选择                                        | `boolean`            | `false`   |
| data          | 展示数据                                                | `array`              | `[]`      |
| **fields**    | 数据字段映射                                            | **SearchTreeFields** | `{}`      |
| height        | 整体高度                                                | `string`             | `'600px'` |

:::info $attrs
SearchTree 的 `$attrs` 会透传给 ElTree 组件。
:::

### SearchTreeFields

| 属性名   | 说明         | 类型     | 默认值       |
| -------- | ------------ | -------- | ------------ |
| value    | 唯一值字段名 | `string` | `'id'`       |
| label    | 标签字段名   | `string` | `'name'`     |
| children | 子节点字段名 | `string` | `'children'` |

### SearchTree 插槽

| 插槽名 | 说明           |
| ------ | -------------- |
| footer | 自定义底部按钮 |
