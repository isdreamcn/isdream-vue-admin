# Upload 上传

基于 [ElUpload](https://element-plus.org/zh-CN/component/upload.html) 封装，集成文件类型校验、大小限制、进度模拟和预览功能。

## 基础用法

<<< ../../src/views/examples/components/upload/upload.vue

## API

### Upload 属性

| 属性名         | 说明               | 类型                                    | 默认值         |
| -------------- | ------------------ | --------------------------------------- | -------------- |
| **modelValue** | v-model 文件列表   | **UploadFile[]**                        | `[]`           |
| multiple       | 批量上传           | `boolean`                               | `true`         |
| accept         | 接收上传的文件类型 | `string`                                | `'all'`        |
| max            | 文件数量限制       | `number`                                | `Infinity`     |
| maxSize        | 文件大小限制（MB） | `number`                                | `Infinity`     |
| listType       | 文件展示形态       | `'text' \| 'picture' \| 'picture-card'` | `'picture'`    |
| disabled       | 是否禁用           | `boolean`                               | `false`        |
| **rules**      | 文件上传前的校验   | **UploadRule[]**                        | `[]`           |
| preview        | 预览功能           | `(file) => void \| boolean`             | `true`         |
| http           | 文件上传接口       | `Function`                              | `uploadCommon` |
| httpFileKey    | FormData 的 key    | `string`                                | `'file'`       |
| showMessage    | 显示上传结果提示   | `boolean`                               | `true`         |

### UploadFile

| 属性名     | 说明         | 类型                                            | 默认值      |
| ---------- | ------------ | ----------------------------------------------- | ----------- |
| name       | 文件名       | `string`                                        | —           |
| url        | 文件地址     | `string`                                        | —           |
| response   | 原始响应数据 | `object`                                        | —           |
| percentage | 上传进度     | `number`                                        | —           |
| status     | 文件状态     | `'ready' \| 'uploading' \| 'success' \| 'fail'` | `'success'` |

### UploadRule

| 属性名    | 说明                             | 类型                      | 默认值 |
| --------- | -------------------------------- | ------------------------- | ------ |
| validator | 校验函数，返回 `true` 则校验失败 | `(file: File) => boolean` | —      |
| message   | 校验失败提示                     | `string`                  | —      |

### Upload 事件

| 事件名 | 说明                 | 类型                               |
| ------ | -------------------- | ---------------------------------- |
| change | 文件上传、移除时触发 | `(fileList: UploadFile[]) => void` |

### Upload 插槽

| 插槽名  | 说明                     |
| ------- | ------------------------ |
| default | 开启文件选择对话框的按钮 |
| tip     | 提示文字                 |
