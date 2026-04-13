# Markdown

> 基于[vditor](https://github.com/Vanessa219/vditor)

## CDN 切换

[vditor dist 下载](https://www.jsdelivr.com/package/npm/vditor?version=3.11.2)

**修改 CDN** `@/components/markdown/src/hooks/useVditorCDN.ts`

```typescript
/**
 * Vditor CDN 配置
 * Vditor 采用按需加载机制，运行时需通过 CDN 加载主题、表情等静态资源
 * @see https://ld246.com/article/1549638745630#CDN-切换
 *
 * 如需提高稳定性，可将 CDN 资源下载到本地 public 目录，步骤如下：
 * 1. 访问 https://www.jsdelivr.com/package/npm/vditor?version=3.11.2
 * 2. 将整个 dist 目录下载到 public/vditor/
 * 3. 将下方 cdn 改为 '/vditor'（即 public/vditor 的访问路径）
 */

export const useVditorCDN = () => {
  const cdn = 'https://cdn.jsdelivr.net/npm/vditor@3.11.2'
  return {
    cdn,
    themePath: `${cdn}/dist/css/content-theme`,
    emojiPath: `${cdn}/dist/images/emoji`
  }
}
```

## Markdown API

### Markdown 属性

| 属性名           | 说明              | 类型                                                    | 预设值                     |
| ---------------- | ----------------- | ------------------------------------------------------- | -------------------------- |
| options          | 同 vditor.options | `IOptions`                                              | --                         |
| modelValue       | v-model           | `string`                                                | --                         |
| upload           | 文件上传接口      | `Function`                                              | /api/common `uploadCommon` |
| uploadFileKey    | formData.key      | `string`                                                | file                       |
| uploadFileAccept | 可选文件类型      | `file_extension\|audio/*\|video/*\|image/*\|media_type` | image/\*                   |

### Markdown 事件

| 事件名    | 说明               | 类型                        |
| --------- | ------------------ | --------------------------- |
| change    | 当绑定值变化时触发 | `(content: string) => void` |
| getVditor | 获取 vditor 实例   | `(vditor: Vditor) => void`  |

## MarkdownView API

> 预览 markdown

### MarkdownView 属性

| 属性名  | 说明                     | 类型              | 预设值 |
| ------- | ------------------------ | ----------------- | ------ |
| value   | 渲染内容                 | `string`          | --     |
| options | 同 vditor.previewOptions | `IPreviewOptions` | --     |
