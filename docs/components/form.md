# Form 表单

基于 [ElForm](https://element-plus.org/zh-CN/component/form.html) + [ElRow](https://element-plus.org/zh-CN/component/layout.html) 封装，通过配置化方式快速构建表单。

## 基础用法

<<< ../../src/views/examples/components/form/form.vue

字段配置：

<<< ../../src/views/examples/components/form/config.ts

## 联动表单与自动折叠

- `show` / `attrs` 支持函数式（接收当前表单数据），实现字段联动显隐与属性联动
- `update:modelValue`（v-model）与提交/取消同口径回传，范围由两个正交开关控制——绑定的数据即提交的数据（未绑定 v-model 时跳过回传计算）：
  - `filterHidden`（默认 `true`）：字段隐藏即清除数据、提交只回传可见字段；`:filter-hidden="false"` 时隐藏字段数据保留并回传
  - `filter`（默认 `true`）：fields 之外的字段不回传；`:filter="false"` 时原样带回
  - 两者均为 `false` 时不过滤任何数据、全量回传
- 初始即隐藏、从未显示过的回显值始终保留
- 重置（`resetFields` / 重置按钮）时字段恢复为最近一次外部传入的初始值
- inline 模式下字段超出一行自动折叠，显示「展开/收起」按钮（`autoCollapse`，默认开启；disabled 时不折叠）

> 注意：绑定 v-model 且 `filter` 为默认 `true` 时，挂载即回传裁剪版数据——父组件 `modelValue` 中 fields 之外的字段（如回显的 `id`）会被立即裁剪。请勿将其他用途的数据存放在 v-model 绑定的同一对象中，或改用 `:filter="false"`。

```ts
const fields: FormField[] = [
  { tag: 'MSelect', key: 'notifyType', label: '通知方式', attrs: { options: [...] } },
  // 仅 notifyType 为 sms 时显示
  { tag: 'ElInput', key: 'phone', label: '手机号', show: (model) => model.notifyType === 'sms' },
  // attrs 跟随表单数据联动禁用
  { tag: 'ElInput', key: 'remark', label: '备注', attrs: (model) => ({ disabled: !model.notifyType }) }
]
```

> `tag` 传组件对象且 `fields` 用 `reactive()` 包裹时，请用 `markRaw` 包裹组件，避免组件被深度代理产生性能开销（`tag` 传全局注册名字符串则无需处理）。

## API

### Form 属性

| 属性名       | 说明                                                                            | 类型               | 默认值   |
| ------------ | ------------------------------------------------------------------------------- | ------------------ | -------- |
| **fields**   | 表单字段配置                                                                    | **FormField[]**    | —        |
| modelValue   | v-model 表单数据                                                                | `object`           | `{}`     |
| labelWidth   | 标签宽度（inline: true 时忽略）                                                 | `number \| string` | `'auto'` |
| rowAttrs     | ElRow 属性                                                                      | `object`           | —        |
| colAttrs     | ElCol 属性（inline: true 时忽略）                                               | `number \| object` | `6`      |
| disabled     | 禁用所有组件，隐藏默认按钮                                                      | `boolean`          | `false`  |
| inline       | inline 布局：字段横排展示，按钮区与字段同一行、紧随字段之后                     | `boolean`          | `true`   |
| autoCollapse | inline 字段超出一行时自动折叠（disabled 时不折叠）                              | `boolean`          | `true`   |
| filter       | fields 之外字段的过滤。默认 `true`：fields 外字段不回传；`false`：原样带回      | `boolean`          | `true`   |
| filterHidden | fields 内隐藏字段的过滤。默认 `true`：隐藏即清数据、不回传；`false`：保留并回传 | `boolean`          | `true`   |
| loading      | 提交按钮加载中                                                                  | `boolean`          | `false`  |
| submitText   | 提交按钮文字                                                                    | `string`           | —        |
| cancelText   | 取消按钮文字                                                                    | `string`           | —        |
| submitIcon   | 提交按钮图标                                                                    | `string \| false`  | —        |
| cancelIcon   | 取消按钮图标                                                                    | `string \| false`  | —        |

### FormField

| 属性名        | 说明                                   | 类型                            | 默认值  |
| ------------- | -------------------------------------- | ------------------------------- | ------- |
| tag           | 渲染的组件，需支持 v-model             | `Component \| string`           | —       |
| key           | 唯一值                                 | `string`                        | —       |
| label         | 标签                                   | `string`                        | —       |
| show          | 是否显示；支持函数式按表单数据动态显隐 | `boolean \| (model) => boolean` | `true`  |
| slot          | 是否使用具名插槽（name 为 key）        | `boolean`                       | `false` |
| attrs         | 绑定在 tag 上的属性；支持函数式联动    | `object \| (model) => object`   | —       |
| on            | 绑定在 tag 上的事件                    | `object`                        | —       |
| colAttrs      | ElCol 属性                             | `number \| object`              | —       |
| required      | 是否必填                               | `boolean`                       | `false` |
| message       | 必填校验提示文案（默认按组件类型生成） | `string`                        | —       |
| validateRules | 校验规则                               | `FormItemRule[]`                | —       |

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

| 事件名 | 说明         | 类型                 |
| ------ | ------------ | -------------------- |
| submit | 点击确认按钮 | `(formData) => void` |
| cancel | 点击取消按钮 | `(formData) => void` |

### Form 暴露方法（ref 调用）

| 名称          | 说明           |
| ------------- | -------------- |
| elFormRef     | ElForm 实例    |
| validate      | 表单校验       |
| validateField | 校验指定字段   |
| resetFields   | 重置表单       |
| clearValidate | 清除校验状态   |
| scrollToField | 滚动到指定字段 |
