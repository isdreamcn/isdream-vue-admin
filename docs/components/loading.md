# Loading 加载

提供两种加载样式：基础遮罩加载和 Lottie 动画加载。

## 基础用法

<<< ../../src/views/examples/components/loading/loading.vue

## MLoading API

### Loading 属性

| 属性名  | 说明             | 类型      | 默认值  |
| ------- | ---------------- | --------- | ------- |
| loading | 是否显示 loading | `boolean` | `false` |
| zIndex  | 遮罩层 z-index   | `number`  | `9999`  |

### Loading 插槽

| 插槽名  | 说明                |
| ------- | ------------------- |
| default | 自定义 loading 内容 |

## MLoadingLottie API

Lottie 动画版本的 Loading 组件。

### LoadingLottie 属性

| 属性名  | 说明             | 类型      | 默认值  |
| ------- | ---------------- | --------- | ------- |
| loading | 是否显示 loading | `boolean` | `false` |
