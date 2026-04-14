# FormDialog 弹窗表单

基于 [MForm](./form.md) + [ElDialog](https://element-plus.org/zh-CN/component/dialog.html) 封装，支持新增/编辑/查看三种模式，自动处理详情获取和数据提交。

## 基础用法

<<< ../../src/views/examples/components/formDialog/formDialog.vue

## API

### FormDialog 属性

| 属性名        | 说明                                                  | 类型                      | 默认值   |
| ------------- | ----------------------------------------------------- | ------------------------- | -------- |
| **fields**    | 表单字段配置（同 [Form fields](./form.md#formfield)） | **FormField[]**           | —        |
| modelValue    | v-model 弹窗显示隐藏                                  | `boolean`                 | `false`  |
| id            | 0 为新增，其他为编辑                                  | `number`                  | `0`      |
| value         | 表单初始值                                            | `object`                  | `{}`     |
| disabled      | 禁用表单，隐藏默认按钮                                | `boolean`                 | `false`  |
| disabledTitle | disabled 为 true 时弹窗标题                           | `string`                  | `'查看'` |
| addTitle      | 新增时弹窗标题                                        | `string`                  | `'新增'` |
| editTitle     | 编辑时弹窗标题                                        | `string`                  | `'编辑'` |
| httpGet       | 获取详情接口                                          | `(id) => Promise<{data}>` | —        |
| httpAdd       | 新增接口                                              | `(data) => Promise`       | —        |
| httpEdit      | 编辑接口                                              | `(id, data) => Promise`   | —        |
| handler       | httpEdit 执行前处理数据                               | `(data) => data`          | —        |
| getHandler    | httpGet 执行后处理返回值                              | `(data) => data`          | —        |

:::info $attrs
FormDialog 的 `$attrs` 会透传给 ElDialog 组件，支持所有 ElDialog 属性。
:::

### FormDialog 事件

| 事件名 | 说明                        | 类型         |
| ------ | --------------------------- | ------------ |
| reload | httpAdd/httpEdit 执行成功后 | `() => void` |
