# Form

> 基于[ElForm](https://element-plus.org/zh-CN/component/form.html) + [ElRow](https://element-plus.org/zh-CN/component/layout.html)

## API

### Form 属性

| 属性名     | 说明               | 类型             | 预设值 |
| ---------- | ------------------ | ---------------- | ------ |
| **fields**     | 表单字段配置       | **Form-Field[]** | --     |
| modelValue | `v-model`          | `object`         | --     |
| labelWidth | 标签所占宽度       | `number\|string` | auto   |
| colAttrs   | el-col 属性        | `number\|object` | 6      |
| inline     | 按钮放入 col       | `boolean`        | true   |
| loading    | 提交按钮是否加载中 | `boolean`        | true   |
| submitText | 提交按钮文字       | `string`         | --     |
| cancelText | 取消按钮文字       | `string`         | --     |
| submitIcon | 提交按钮图标       | `string\|false`  | --     |
| cancelIcon | 取消按钮图标       | `string\|false`  | --     |

#### Form-Field 属性

| 属性名        | 说明                              | 类型                                            | 预设值 |
| ------------- | --------------------------------- | ----------------------------------------------- | ------ |
| tag           | 渲染的组件类型， 需要支持 v-model | `Component\|string`                             | --     |
| key           | 唯一值                            | `string`                                        | --     |
| label         | 标签                              | `string`                                        | --     |
| show          | 是否显示                          | `boolean`                                       | true   |
| slot          | 是否使用具名插槽，name 为`key`    | `boolean`                                       | false  |
| **attrs**         | 绑定在 tag 上的属性               | `object` & **{ options: Form-Field-Option[] }** | --     |
| on            | 绑定在 tag 上的事件               | `object`                                        | --     |
| colAttrs      | el-col 属性                       | `number\|object`                                | --     |
| placeholder   | 占位符                            | `string`                                        | --     |
| required      | 是否必填                          | `boolean`                                       | false  |
| validateRules | 校验规则 FormItem rules           | el `FormItemRule[]`                             | --     |

#### Form-Field-Option 属性

| 属性名   | 说明     | 类型             | 预设值 |
| -------- | -------- | ---------------- | ------ |
| label    | 标签     | `string`         | --     |
| value    | 实际值   | `string\|number` | --     |
| disabled | 是否禁用 | `boolean`        | false  |

### Form 插槽

| 插槽名               | 说明                                          |
| -------------------- | --------------------------------------------- |
| **[Form-Field key]** | Form-Field slot 为 true 时， 自定义标签后内容 |
| buttons              | 自定义 提交/取消 按钮                         |

### Form 事件

| 事件名  | 说明                  | 类型                                      |
| ------- | --------------------- | ----------------------------------------- |
| submit  | 点击确认按钮          | `(formData: Record<string, any>) => void` |
| cancel  | 点击取消按钮          | `(formData: Record<string, any>) => void` |
| getForm | 获取 el-form instance | `(elFormRef: ElFormInstance) => void`     |
