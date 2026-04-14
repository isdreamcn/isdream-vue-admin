# Lottie 动画

基于 [lottie-web](https://airbnb.io/lottie/) 封装，用于播放 Lottie 动画。可在 [LottieFiles](https://lottiefiles.com/featured) 获取动画资源。

## 基础用法

<<< ../../src/views/examples/components/lottie/lottie.vue

## API

### Lottie 属性

| 属性名   | 说明                            | 类型              | 默认值   |
| -------- | ------------------------------- | ----------------- | -------- |
| config   | lottie.loadAnimation 参数       | `AnimationConfig` | `{}`     |
| width    | 容器宽度                        | `string`          | `'100%'` |
| height   | 容器高度                        | `string`          | `'100%'` |
| **data** | 动画 JSON 数据（animationData） | `object`          | —        |

### Lottie 事件

| 事件名  | 说明             | 类型                            |
| ------- | ---------------- | ------------------------------- |
| created | 动画实例创建完成 | `(anim: AnimationItem) => void` |

### Exposes

| 名称    | 说明                            | 类型            |
| ------- | ------------------------------- | --------------- |
| anim    | lottie.loadAnimation 返回的实例 | `AnimationItem` |
| destroy | 销毁动画                        | `() => void`    |
