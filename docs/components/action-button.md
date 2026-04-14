# ActionButton 操作按钮

基于 [ElButton](https://element-plus.org/zh-CN/component/button.html) + [ElPopconfirm](https://element-plus.org/zh-CN/component/popconfirm.html) 封装，一般用于 Table 中的操作按钮。

:::tip 组件注册名
ActionButton 组件以 `MA` 名称注册，模板中使用 `<MA>` 或 `<M-A>`。
:::

## API

### A 属性

| 属性名     | 说明                                              | 类型                                                        | 默认值           |
| ---------- | ------------------------------------------------- | ----------------------------------------------------------- | ---------------- |
| type       | 按钮类型                                          | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'`      |
| pop        | 是否显示气泡确认框（type 为 `danger` 时默认显示） | `boolean`                                                   | —                |
| popTitle   | 气泡确认框标题                                    | `string`                                                    | `'确认删除吗？'` |
| submitText | 确认按钮文字                                      | `string`                                                    | `'是'`           |
| cancelText | 取消按钮文字                                      | `string`                                                    | `'否'`           |
| popAttrs   | ElPopconfirm 属性                                 | `object`                                                    | —                |

:::info $attrs
A 组件的 `$attrs` 会透传给 ElButton 组件。
:::

### A 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义按钮文字 |

### A 事件

| 事件名 | 说明              | 类型                   |
| ------ | ----------------- | ---------------------- |
| click  | 点击确认/点击按钮 | `(evt: Event) => void` |
