# TreeSelect

> 基于 [ElTreeSelect](https://element-plus.org/zh-CN/component/tree-select.html)

## API

### TreeSelect 属性

| 属性名     | 说明                     | 类型                 | 预设值 |
| ---------- | ------------------------ | -------------------- | ------ |
| modelValue | `v-model` 单选、多选     | `any\|any[]`         | --     |
| data       | 展示数据                 | `array`              | --     |
| **fields** | 展示数据配置             | **TreeSelectFields** | --     |
| $attrs     | 绑定在 el-tree-select 上 | --                   | --     |

#### TreeSelect-fields (TreeSelectFields)

| 属性名   | 说明   | 类型     | 预设值   |
| -------- | ------ | -------- | -------- |
| value    | 唯一值 | `string` | id       |
| label    | 标签   | `string` | name     |
| children | 子节点 | `string` | children |
