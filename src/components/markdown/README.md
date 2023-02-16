# markdown

> 基于[vditor](https://github.com/Vanessa219/vditor)

## API

### 属性

| 属性名           | 说明              | 类型       | 预设值                     |
| ---------------- | ----------------- | ---------- | -------------------------- |
| options          | 同 vditor.options | `object`   | --                         |
| modelValue       | v-model           | `string`   | --                         |
| upload           | 文件上传接口      | `Function` | /api/common `uploadCommon` |
| uploadFileKey    | formData.key      | `string`   | file                       |
| uploadFileAccept | 可选文件类型      | [string](https://www.w3schools.com/tags/att_input_accept.asp) | image/\* |

### 事件

| 事件名    | 说明               | 类型       |
| --------- | ------------------ | ---------- |
| change    | 当绑定值变化时触发 | `Function` |
| getVditor | 获取 vditor 实例   | `Function` |

## markdownView

> 预览 markdown

### markdownView 属性

| 属性名  | 说明                      | 类型     | 预设值 |
| ------- | ------------------------- | -------- | ------ |
| value   | 渲染内容                  | `string` | --     |
| options | 同 vditor.IPreviewOptions | `object` | --     |
