# Markdown

> 基于[vditor](https://github.com/Vanessa219/vditor)

## Markdown API

### Markdown 属性

| 属性名           | 说明              | 类型       | 预设值                     |
| ---------------- | ----------------- | ---------- | -------------------------- |
| options          | 同 vditor.options | `IOptions`   | --                         |
| modelValue       | v-model           | `string`   | --                         |
| upload           | 文件上传接口      | `Function` | /api/common `uploadCommon` |
| uploadFileKey    | formData.key      | `string`   | file                       |
| uploadFileAccept | 可选文件类型      | `file_extension\|audio/*\|video/*\|image/*\|media_type` | image/\* |

### Markdown 事件

| 事件名    | 说明               | 类型       |
| --------- | ------------------ | ---------- |
| change    | 当绑定值变化时触发 | `(content: string) => void` |
| getVditor | 获取 vditor 实例   | `(vditor: Vditor) => void`  |

## MarkdownView API

> 预览 markdown

### MarkdownView 属性

| 属性名  | 说明                      | 类型     | 预设值 |
| ------- | ------------------------- | -------- | ------ |
| value   | 渲染内容                  | `string` | --     |
| options | 同 vditor.previewOptions | `IPreviewOptions` | --     |
