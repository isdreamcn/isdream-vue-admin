# Editor

> 基于 [tinymce5](https://www.tiny.cloud/docs/release-notes/release-notes50/)

## API

### Editor 属性

| 属性名        | 说明                      | 类型       | 预设值                     |
| ------------- | ------------------------- | ---------- | -------------------------- |
| options       | tinymce.init Options      | `object`   | --                         |
| modelValue    | tinymce content `v-model` | `string`   | --                         |
| disabled      | tinymce 禁用              | `boolean`  | false                      |
| toolbar       | Editor.options toolbar    | `string[]` | [...]                      |
| plugins       | Editor.options plugins    | `string[]` | [...]                      |
| height        | Editor.options height     | `number`   | 400                        |
| upload        | 文件上传接口              | `Function` | /api/common `uploadCommon` |
| uploadFileKey | formData.key              | `string`   | file                       |

### Editor 事件

| 事件名     | 说明               | 类型                        |
| ---------- | ------------------ | --------------------------- |
| change     | 富文本内容变化     | `(content: string) => void` |
| inited     | tinymce.init 完成  | `(editor: Editor) => void`  |
| init-error | tinymce.init error | `(err: any) => void`        |
| $attrs     | 绑定在 editor.on   | `onActivate\|onAddUndo...`  |
