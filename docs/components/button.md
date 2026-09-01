# Button 按钮

基于 [ElButton](https://element-plus.org/zh-CN/component/button.html) + [ElTooltip](https://element-plus.org/zh-CN/component/tooltip.html) 封装：`http` 驱动自动 loading、danger/warning 默认二次确认、置灰按钮可点击提示。未声明的属性与事件全部透传 ElButton；未显式传 `type` 时默认 `primary`（ElButton 原生默认为普通样式）。

## 基础用法

<<< ../../src/views/examples/components/button/button.vue

## 重要约定：http 与 @click 互斥

传入 `http` 后点击只执行 `http` 并管理 loading，**不再触发 `click` 事件**；需要点击后的其他动作，写进 `http` 内联函数中：

```vue
<!-- ✅ 正确 -->
<MButton :http="() => save().then(close)">保存</MButton>

<!-- ❌ close 永远不会执行 -->
<MButton :http="save" @click="close">保存</MButton>
```

## 错误处理

`http` 执行失败时组件会复位 loading 并触发 `error` 事件，不会产生未处理的 Promise 拒绝。接口错误提示默认由全局拦截器统一处理，无需额外监听；需要在失败时执行额外逻辑的（如失败后重新打开弹窗），监听 `error`：

```vue
<MButton :http="save" @error="handleError">保存</MButton>
```

## 批量删除配方

```vue
<MButton
  type="danger"
  message="确认要删除选择的数据吗？"
  :disabled="!selectKeys.length"
  disabled-tip="请选择需要删除的数据"
  :http="() => testDel(selectKeys).then(reload)"
>
  批量删除
</MButton>
```

## API

### Button 属性

| 属性名          | 说明                                                           | 类型                             | 默认值           |
| --------------- | -------------------------------------------------------------- | -------------------------------- | ---------------- |
| pop             | 点击前弹出二次确认；danger/warning 默认开启，`null` 强制关闭   | `boolean \| null`                | —                |
| message         | 二次确认弹窗的提示文案                                         | `string`                         | 确定执行操作吗？ |
| messageBoxProps | ElMessageBox 其余配置透传                                      | `ElMessageBoxOptions`            | —                |
| tooltip         | 悬浮提示文案                                                   | `string`                         | —                |
| tooltipProps    | ElTooltip 其余配置透传                                         | `Partial<UseTooltipProps>`       | —                |
| loading         | 外部 loading，与内部 http loading 取或                         | `boolean`                        | false            |
| http            | 点击自动执行并管理 loading，传入后不触发 click 事件            | `() => Promise<unknown> \| void` | —                |
| disabledTip     | 置灰按钮点击提示文案（传入后 disabled 仅保留置灰外观，可点击） | `string`                         | —                |
| $attrs          | 透传至 el-button                                               | —                                | —                |

### Button 事件

| 事件名 | 说明                         | 类型                  |
| ------ | ---------------------------- | --------------------- |
| click  | 点击触发（仅未传 `http` 时） | `(event: MouseEvent)` |
| cancel | 二次确认弹窗被取消时触发     | `() => void`          |

### Button 插槽

| 插槽名  | 说明     |
| ------- | -------- |
| default | 按钮内容 |
