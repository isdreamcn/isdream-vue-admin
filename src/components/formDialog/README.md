# FormDialog

> 基于 `components/form` + [ElDialog](https://element-plus.org/zh-CN/component/dialog.html)

## API

### FormDialog 属性

| 属性名        | 说明                                        | 类型                                                   | 预设值 |
| ------------- | ------------------------------------------- | ------------------------------------------------------ | ------ |
| **fields**    | 表单字段配置                                | **FormField[]**                                        | --     |
| modelValue    | `v-model` dialog 显示隐藏                   | `boolean`                                              | false  |
| id            | 0 为新增，其他为编辑                        | `number`                                               | 0      |
| value         | form 默认值                                 | `object`                                               | --     |
| disabled      | form 是否禁用表单内的所有组件，隐藏默认按钮 | `boolean`                                              | false  |
| disabledTitle | `disabled`为`true`时, dialog 标题           | `string`                                               | 查看   |
| addTitle      | 新增时，dialog 标题                         | `string`                                               | 新增   |
| editTitle     | 编辑时，dialog 标题                         | `string`                                               | 编辑   |
| httpGet       | 获取详情的 api                              | `(id: number) => Promise<{data: Record<string, any>}>` | --     |
| httpAdd       | 新增的 api                                  | `(data: any) => Promise`                               | --     |
| httpEdit      | 编辑的 api                                  | `(id: number, data: any) => Promise`                   | --     |
| handler       | httpEdit 执行前调用，处理 httpEdit data     | `(data: Record<string, any>) => Record<string, any>`   | --     |
| getHandler    | httpGet 执行后调用，处理 httpEdit 返回值    | `(data: Record<string, any>) => Record<string, any>`   | --     |
| $attrs        | dialog 属性，同 ElDialog                    | `object`                                               | --     |

### FormDialog 事件

| 事件名 | 说明                           | 类型         |
| ------ | ------------------------------ | ------------ |
| reload | `httpAdd\|httpEdit` 执行成功后 | `() => void` |
