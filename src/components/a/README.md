# A

> 基于[ElButton](https://element-plus.org/zh-CN/component/button.html) 、[ElPopconfirm](https://element-plus.org/zh-CN/component/popconfirm.html)
> 一般用于 table 中的操作按钮

## API

### A 属性

| 属性名 | 说明             | 类型                                  | 预设值  |
| ------ | ---------------- | ------------------------------------- | ------- |
| type   | 按钮类型 | `primary\|success\|warning\|danger\|info` | primary |
| pop | 是否显示气泡确认框, type 等于`danger`时默认显示 | `boolean` | -- |
| popTitle | 气泡确认框标题 | `string` | 确认删除吗？ |
| submitText | 气泡确认框确认文字 | `string` | 是 |
| cancelText | 气泡确认框取消文字 | `string` | 否 |
| popAttrs | 同 ElPopconfirm 属性 | -- | -- |
| $attrs | 同 ElButton 属性 | -- | -- |

### A 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义按钮文字 |

### A 事件

| 事件名 | 说明                            | 类型       |
| ------ | ------------------------------- | ---------- |
| click  | 点击气泡确认框确认按钮/点击按钮 | `(evt: Event) => void` |
