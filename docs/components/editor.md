# Editor 富文本编辑器

基于 [TinyMCE 5](https://www.tiny.cloud/docs/release-notes/release-notes50/) 封装，支持工具栏自定义和图片上传。

## 基础用法

<<< ../../src/views/examples/components/editor/editor.vue

## API

### Editor 属性

| 属性名        | 说明               | 类型                         | 默认值         |
| ------------- | ------------------ | ---------------------------- | -------------- |
| options       | TinyMCE init 配置  | `Partial<RawEditorSettings>` | `{}`           |
| modelValue    | v-model 编辑器内容 | `string`                     | `''`           |
| disabled      | 禁用编辑器         | `boolean`                    | `false`        |
| toolbar       | 工具栏按钮         | `string[]`                   | 内置默认       |
| plugins       | 插件列表           | `string[]`                   | 内置默认       |
| height        | 编辑器高度         | `number \| string`           | `400`          |
| upload        | 图片上传接口       | `Function \| false`          | `uploadCommon` |
| uploadFileKey | FormData 的 key    | `string`                     | `'file'`       |

### Editor 事件

| 事件名            | 说明               | 类型                        |
| ----------------- | ------------------ | --------------------------- |
| change            | 内容变化时触发     | `(content: string) => void` |
| update:modelValue | 内容变化时触发     | `(content: string) => void` |
| inited            | TinyMCE 初始化完成 | `(editor: Editor) => void`  |
| init-error        | TinyMCE 初始化错误 | `(err: any) => void`        |

:::info $attrs
Editor 的 `$attrs`会透传给 TinyMCE 的事件系统（如`onActivate`、`onAddUndo` 等）。
:::
