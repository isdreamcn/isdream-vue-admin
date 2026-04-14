# Icon 图标

基于 [ElIcon](https://element-plus.org/zh-CN/component/icon.html) + [iconfont](https://www.iconfont.cn/) 封装，统一 Element Plus 图标和自定义图标的用法。

## 基础用法

<<< ../../src/views/examples/components/icon/icon.vue

## API

### Icon 属性

| 属性名 | 说明                                                          | 类型     | 默认值 |
| ------ | ------------------------------------------------------------- | -------- | ------ |
| size   | 图标大小                                                      | `number` | 继承   |
| color  | 图标颜色                                                      | `string` | —      |
| name   | 图标名称，`icon-` 开头为 EP 图标，`iconfont-` 开头为 iconfont | `string` | —      |

### Icon 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |
