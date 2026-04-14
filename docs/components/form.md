# Form 表单

基于 [ElForm](https://element-plus.org/zh-CN/component/form.html) + [ElRow](https://element-plus.org/zh-CN/component/layout.html) 封装，通过配置化方式快速构建表单。

## 基础用法

<<< ../../src/views/examples/components/form/form.vue

字段配置：

<<< ../../src/views/examples/components/form/config.ts

## API

### Form 属性

| 属性名     | 说明                              | 类型               | 默认值   |
| ---------- | --------------------------------- | ------------------ | -------- |
| **fields** | 表单字段配置                      | **FormField[]**    | —        |
| modelValue | v-model 表单数据                  | `object`           | `{}`     |
| labelWidth | 标签宽度（inline: true 时忽略）   | `number \| string` | `'auto'` |
| rowAttrs   | ElRow 属性                        | `object`           | —        |
| colAttrs   | ElCol 属性（inline: true 时忽略） | `number \| object` | `6`      |
| disabled   | 禁用所有组件，隐藏默认按钮        | `boolean`          | `false`  |
| inline     | 按钮放入 col                      | `boolean`          | `true`   |
| loading    | 提交按钮加载中                    | `boolean`          | `false`  |
| submitText | 提交按钮文字                      | `string`           | —        |
| cancelText | 取消按钮文字                      | `string`           | —        |
| submitIcon | 提交按钮图标                      | `string \| false`  | —        |
| cancelIcon | 取消按钮图标                      | `string \| false`  | —        |

### FormField

| 属性名        | 说明                            | 类型                  | 默认值  |
| ------------- | ------------------------------- | --------------------- | ------- |
| tag           | 渲染的组件，需支持 v-model      | `Component \| string` | —       |
| key           | 唯一值                          | `string`              | —       |
| label         | 标签                            | `string`              | —       |
| show          | 是否显示                        | `boolean`             | `true`  |
| slot          | 是否使用具名插槽（name 为 key） | `boolean`             | `false` |
| attrs         | 绑定在 tag 上的属性             | `object`              | —       |
| on            | 绑定在 tag 上的事件             | `object`              | —       |
| colAttrs      | ElCol 属性                      | `number \| object`    | —       |
| required      | 是否必填                        | `boolean`             | `false` |
| validateRules | 校验规则                        | `FormItemRule[]`      | —       |

### FormFieldOption

attrs.options 中每项的格式：

| 属性名   | 说明     | 类型               | 默认值  |
| -------- | -------- | ------------------ | ------- |
| label    | 标签     | `string`           | —       |
| value    | 实际值   | `string \| number` | —       |
| disabled | 是否禁用 | `boolean`          | `false` |

### Form 插槽

| 插槽名          | 说明                                        |
| --------------- | ------------------------------------------- |
| **[field key]** | FormField slot 为 true 时，自定义标签后内容 |
| buttons         | 自定义提交/取消按钮                         |

### Form 事件

| 事件名  | 说明             | 类型                  |
| ------- | ---------------- | --------------------- |
| submit  | 点击确认按钮     | `(formData) => void`  |
| cancel  | 点击取消按钮     | `(formData) => void`  |
| getForm | 获取 ElForm 实例 | `(elFormRef) => void` |
