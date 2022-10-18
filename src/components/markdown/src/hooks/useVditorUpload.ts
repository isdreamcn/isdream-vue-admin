import type { MarkdownProps } from '../markdown'

export const useVditorUpload = (
  props: MarkdownProps,
  change: (imgUrl: string, filename: string) => void = () => {}
) => {
  return {
    vditorUploadOptions: {
      upload: {
        // url: serviceBaseURL + Api.Upload,
        handler: (files: File[]): Promise<any> => {
          if (!props.upload) {
            return Promise.resolve('请配置http')
          }
          const file = files[0]
          const formData = new FormData()
          formData.append(props.uploadFileKey, file)
          return props
            .upload(formData)
            .then((res) => {
              change(res.data.url, res.data.name)
              return '上传成功'
            })
            .catch(() => {
              return '上传失败'
            })
        },
        multiple: false,
        accept: 'image/*'
      }
    }
  }
}
