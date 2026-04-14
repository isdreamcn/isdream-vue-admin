# Markdown 编辑器

基于 [Vditor](https://github.com/Vanessa219/vditor) 封装，提供 Markdown 编辑和预览功能。

## 基础用法

<<< ../../src/views/examples/components/markdown/markdown.vue

## CDN 配置

Vditor 运行时通过 CDN 加载主题、表情等静态资源。可在 `src/components/markdown/src/hooks/useVditorCDN.ts` 中修改 CDN 地址：

<<< ../../src/components/markdown/src/hooks/useVditorCDN.ts

如需提高稳定性，可将 CDN 资源下载到 `public/vditor/` 目录，然后将 `cdn` 改为 `'/vditor'`。

## MMarkdown API

### Markdown 属性

| 属性名           | 说明            | 类型                | 默认值         |
| ---------------- | --------------- | ------------------- | -------------- |
| options          | Vditor 配置选项 | `IOptions`          | `{}`           |
| modelValue       | v-model 内容    | `string`            | `''`           |
| upload           | 图片上传接口    | `Function \| false` | `uploadCommon` |
| uploadFileKey    | FormData 的 key | `string`            | `'file'`       |
| uploadFileAccept | 可选文件类型    | `string`            | `'image/*'`    |

### Markdown 事件

| 事件名            | 说明             | 类型                        |
| ----------------- | ---------------- | --------------------------- |
| change            | 内容变化时触发   | `(content: string) => void` |
| update:modelValue | 内容变化时触发   | `(content: string) => void` |
| getVditor         | 获取 Vditor 实例 | `(vditor: Vditor) => void`  |

## MMarkdownView API

Markdown 预览组件。

### MarkdownView 属性

| 属性名  | 说明            | 类型              | 默认值 |
| ------- | --------------- | ----------------- | ------ |
| value   | 渲染内容        | `string`          | —      |
| options | Vditor 预览配置 | `IPreviewOptions` | —      |
