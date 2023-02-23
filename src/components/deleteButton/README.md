# DeleteButton

> 基于 [ElDialog](https://element-plus.org/zh-CN/component/dialog.html) + [ElButton](https://element-plus.org/zh-CN/component/button.html)

## API

### DeleteButton 属性

| 属性名     | 说明               | 类型      | 预设值 |
| ---------- | ------------------ | --------- | ------ |
| disabled | 禁用按钮         | `boolean`  | false     |
| submitText | 弹框确认按钮文字        | `string`  | 确认     |
| cancelText | 弹框取消按钮文字        | `string`  | 取消     |
| title | 弹框标题        | `string`  | 确认要删除选择的数据吗？     |
| content | 弹框内容      | `string`  | 数据将被永久删除，且无法恢复，请确认您的操作。     |
| message | 接口调用成功的提示文本      | `string`  |  删除成功   |
| selectKeys | 删除项 | `array`  | [] |
| http | 用于删除的http | `function` | -- |
| httpLoop | 循环执行http | `function` | true |
| handler | 处理http参数 | `function` | (data: any) => data |
| $attrs | 绑定在el-dialog上 | -- | -- |

### DeleteButton 事件

| 事件名  | 说明       | 类型          |
| ------ | ---------- | ----------- |
| click | 点击确定 | `() => void` |
| reload | 删除完毕 | `() => void` |
