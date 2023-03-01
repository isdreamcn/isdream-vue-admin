# Upload

## API

### Upload 属性

| 属性名         | 说明                            | 类型                                   | 预设值                     |
| -------------- | ------------------------------- | -------------------------------------- | -------------------------- |
| **modelValue** | `v-model`                       | **UploadFile[]**                       | --                         |
| multiple       | 批量上传                        | `boolean`                              | true                       |
| accept         | 接收上传的文件类型              | `string`                               | all                        |
| max            | 文件数量限制                    | `number`                               | --                         |
| maxSize        | 文件大小限制(byte)              | `number`                               | --                         |
| listType       | 上传的文件展示形态              | `text\|picture\| picture-card`         | picture                    |
| disabled       | 是否禁用                        | `boolean`                              | false                      |
| **rules**      | 文件上传前的校验                | **UploadRule[]**                       | --                         |
| preview        | 预览功能                        | `(file: UploadFile) => void\| boolean` | true                       |
| http           | 文件上传接口                    | `Function`                             | /api/common `uploadCommon` |
| httpFileKey    | formData.key                    | `string`                               | file                       |
| removeFail     | 移除上传失败的文件              | `boolean`                              | true                       |
| showMessage    | 显示上传结果(上传成功/上传失败) | `boolean`                              | true                       |

#### Upload-modelValue (UploadFile)

| 属性名     | 说明             | 类型                                | 预设值  |
| ---------- | ---------------- | ----------------------------------- | ------- |
| name       | 文件名           | `string`                            | --      |
| url        | 文件地址         | `string`                            | --      |
| response   | 原始值/http data | `object`                            | --      |
| percentage | 进度             | `number`                            | --      |
| status     | 文件状态         | `ready\|uploading\|success\| 'fail` | success |

#### Upload-rules (UploadRule)

| 属性名    | 说明                               | 类型                      | 预设值 |
| --------- | ---------------------------------- | ------------------------- | ------ |
| validator | 校验函数，`return true` 则校验失败 | `(file: File) => boolean` | --     |
| message   | 校验失败的提示                     | `string`                  | --     |

### Upload 事件

| 事件名 | 说明           | 类型                               |
| ------ | -------------- | ---------------------------------- |
| change | 文件上传、移除 | `(fileList: UploadFile[]) => void` |

### Upload 插槽

| 插槽名  | 说明               |
| ------- | ------------------ |
| default | 开启文件选择的按钮 |
| tip     | 提示               |
