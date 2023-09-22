# Lottie

> 基于[lottie-web](https://airbnb.io/lottie/) > [lottie 资源](https://lottiefiles.com/featured)

## API

### Lottie 属性

| 属性名 | 说明                                 | 类型     | 预设值 |
| ------ | ------------------------------------ | -------- | ------ |
| config | lottie.loadAnimation 参数            | `object` | --     |
| width  | lottie 容器宽度                      | `string` | 100%   |
| height | lottie 容器高度                      | `string` | 100%   |
| data   | lottie.loadAnimation `animationData` | `object` | --     |

### Lottie 事件

| 事件名  | 说明                            | 类型                            |
| ------- | ------------------------------- | ------------------------------- |
| created | lottie.loadAnimation 返回的实例 | `(anim: AnimationItem) => void` |

### Exposes

| 名称    | 说明                            | 类型            |
| ------- | ------------------------------- | --------------- |
| anim    | lottie.loadAnimation 返回的实例 | `AnimationItem` |
| destroy | 销毁 lottie.loadAnimation       | `() => void`    |
