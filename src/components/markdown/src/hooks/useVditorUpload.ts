import type { MarkdownProps } from '../markdown'
import { joinBaseUrlFile } from '@/utils'

export const useVditorUpload = (
  props: MarkdownProps,
  callback: (val: string) => void = () => {}
) => {
  return {
    vditorUploadOptions: {
      upload: {
        handler: (files: File[]): Promise<any> => {
          if (!props.upload) {
            return Promise.resolve('请配置upload')
          }
          const file = files[0]
          const formData = new FormData()
          formData.append(props.uploadFileKey, file)
          return props
            .upload(formData)
            .then(({ data }) => {
              if (!/^blob:/.test(data.url)) {
                data.url = joinBaseUrlFile(data.url)
              }
              callback(
                (/^image\//.test(data.mimeType) ? '!' : '') +
                  `[${data.filename}](${data.url})`
              )
              return '上传成功'
            })
            .catch(() => {
              return '上传失败'
            })
        },
        multiple: false,
        accept: props.uploadFileAccept
      }
    }
  }
}
