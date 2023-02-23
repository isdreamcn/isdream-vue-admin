# ColorPicker

> 基于[ElColorPicker](https://element-plus.org/zh-CN/component/color-picker.html)

## API

### ColorPicker 属性

| 属性名     | 说明               | 类型      | 预设值 |
| ---------- | ------------------ | --------- | ------ |
| modelValue | v-model            | `string`  | --     |
| custom     | 显示 ElColorPicker | `boolean` | true   |

### ColorPicker-options 属性

> **会根据`options.value`去重**

| 属性名 | 说明                   | 类型     | 预设值 |
| ------ | ---------------------- | -------- | ------ |
| label  | 颜色说明、鼠标悬浮显示 | `string` | --     |
| value  | 颜色值                 | `string` | --     |

### ColorPicker 事件

| 事件名 | 说明       | 类型                          |
| ------ | ---------- | ----------------------------- |
| change | 选择颜色值 | `(color?: string) => => void` |

## ColorPickerAppTheme API

> 用于更换主题色
> 给 CSS 样式的对象设置一个新的值
> 设置 pinia appState appSetting

### ColorPickerAppTheme 属性

| 属性名        | 说明                           | 类型                        | 预设值 |
| ------------- | ------------------------------ | --------------------------- | ------ |
| cssKey        | 执行 style.setProperty         | `string`                    | --     |
| appSettingKey | 设置 appSetting[appSettingKey] | `string`                    | --     |
| options       | 预设颜色                       | `array`同ColorPicker-options | [...]  |
| $attrs        | --                             | 同 ColorPicker 属性         | --     |
