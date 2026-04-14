# DeleteButton 删除按钮

基于 [ElDialog](https://element-plus.org/zh-CN/component/dialog.html) + [ElButton](https://element-plus.org/zh-CN/component/button.html) 封装，提供二次确认删除功能，支持批量删除。

## 基础用法

<<< ../../src/views/examples/components/deleteButton/deleteButton.vue

## API

### DeleteButton 属性

| 属性名     | 说明                      | 类型                      | 默认值                       |
| ---------- | ------------------------- | ------------------------- | ---------------------------- |
| disabled   | 禁用按钮                  | `boolean`                 | `false`                      |
| submitText | 确认按钮文字              | `string`                  | `'确认'`                     |
| cancelText | 取消按钮文字              | `string`                  | `'取消'`                     |
| title      | 弹框标题                  | `string`                  | `'确认要删除选择的数据吗？'` |
| content    | 弹框内容                  | `string`                  | `'数据将被永久删除...'`      |
| message    | 接口成功提示文本          | `string`                  | `'删除成功'`                 |
| selectKeys | 删除项列表                | `array`                   | `[]`                         |
| http       | 删除接口                  | `(...payload) => Promise` | —                            |
| httpLoop   | 循环执行 http（逐个删除） | `boolean`                 | `true`                       |
| handler    | 处理 http 参数            | `(data) => data`          | —                            |

:::info $attrs
DeleteButton 的 `$attrs` 会透传给 ElDialog 组件。
:::

### DeleteButton 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义按钮内容 |

### DeleteButton 事件

| 事件名 | 说明     | 类型         |
| ------ | -------- | ------------ |
| click  | 点击确定 | `() => void` |
| reload | 删除完毕 | `() => void` |
