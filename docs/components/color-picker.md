# ColorPicker 颜色选择器

基于 [ElColorPicker](https://element-plus.org/zh-CN/component/color-picker.html) 封装，提供预设色板和自定义颜色选择。

## 基础用法

<<< ../../src/views/examples/components/colorPicker/colorPicker.vue

## ColorPicker API

### ColorPicker 属性

| 属性名      | 说明                 | 类型                         | 默认值 |
| ----------- | -------------------- | ---------------------------- | ------ |
| modelValue  | v-model 颜色值       | `string`                     | —      |
| **options** | 预设颜色选项         | **ColorPickerOptionsItem[]** | `[]`   |
| custom      | 显示自定义颜色选择器 | `boolean`                    | `true` |

### ColorPickerOptionsItem

:::tip
会根据 `options.value` 自动去重。
:::

| 属性名 | 说明                     | 类型     | 默认值 |
| ------ | ------------------------ | -------- | ------ |
| label  | 颜色说明（鼠标悬浮显示） | `string` | —      |
| value  | 颜色值                   | `string` | —      |

### ColorPicker 事件

| 事件名 | 说明           | 类型                       |
| ------ | -------------- | -------------------------- |
| change | 选择颜色时触发 | `(color?: string) => void` |

## ColorPickerAppTheme API

用于更换主题色的特殊版本，会同步更新 CSS 变量和 Pinia Store。

### ColorPickerAppTheme 属性

| 属性名        | 说明                                   | 类型                         | 默认值   |
| ------------- | -------------------------------------- | ---------------------------- | -------- |
| cssKey        | 执行 `style.setProperty` 的 CSS 变量名 | `string`                     | —        |
| appSettingKey | 设置 `appSetting[appSettingKey]` 的值  | `string`                     | —        |
| **options**   | 预设颜色                               | **ColorPickerOptionsItem[]** | 内置色板 |
