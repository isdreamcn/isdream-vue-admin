# SearchTree

> 基于 [ElTree](https://element-plus.org/zh-CN/component/tree.html)

## API

### SearchTree 属性

| 属性名        | 说明                                                | 类型                 | 预设值 |
| ------------- | --------------------------------------------------- | -------------------- | ------ |
| modelValue    | `v-model` `show-checkbox` ? 勾选的节点 : 选中的节点 | `any[]\|any`         | --     |
| show-checkbox | 节点是否可被选择                                    | `boolean`            | false  |
| data          | 展示数据                                            | `array`              | --     |
| **fields**    | 展示数据配置                                        | **SearchTreeFields** | --     |
| height        | 整体高度                                            | `string`             | 600px  |
| $attrs        | 绑定在 el-tree 上                                   | --                   | --     |

#### SearchTree-fields (SearchTreeFields)

| 属性名   | 说明   | 类型     | 预设值   |
| -------- | ------ | -------- | -------- |
| value    | 唯一值 | `string` | id       |
| label    | 标签   | `string` | name     |
| children | 子节点 | `string` | children |

### SearchTree 插槽

| 插槽名 | 说明           |
| ------ | -------------- |
| footer | 自定义底部按钮 |
