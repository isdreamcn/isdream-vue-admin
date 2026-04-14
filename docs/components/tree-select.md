# TreeSelect 树选择器

基于 [ElTreeSelect](https://element-plus.org/zh-CN/component/tree-select.html) 封装，支持自定义字段映射。

## 基础用法

<<< ../../src/views/examples/components/treeSelect/treeSelect.vue

## API

### TreeSelect 属性

| 属性名     | 说明               | 类型                 | 默认值 |
| ---------- | ------------------ | -------------------- | ------ |
| modelValue | v-model 单选或多选 | `any \| any[]`       | —      |
| data       | 展示数据           | `array`              | `[]`   |
| **fields** | 数据字段映射       | **TreeSelectFields** | `{}`   |

:::info $attrs
TreeSelect 的 `$attrs`会透传给 ElTreeSelect 组件，支持`multiple`、`show-checkbox` 等属性。
:::

### TreeSelectFields

| 属性名   | 说明         | 类型     | 默认值       |
| -------- | ------------ | -------- | ------------ |
| value    | 唯一值字段名 | `string` | `'id'`       |
| label    | 标签字段名   | `string` | `'name'`     |
| children | 子节点字段名 | `string` | `'children'` |
