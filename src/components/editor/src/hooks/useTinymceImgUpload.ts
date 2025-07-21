import type { EditorProps } from '../editor'
import type { RawEditorSettings } from 'tinymce'
import { joinBaseUrlFile } from '@/utils'

export const useTinymceImgUpload = (props: EditorProps) => {
  const handleImgUpload: RawEditorSettings['images_upload_handler'] = (
    blobInfo,
    success,
    failure
  ) => {
    if (props.upload === false) {
      failure('props upload is undefined')
      return
    }

    // const { type: fileType } = blobInfo.blob()
    const filename = blobInfo.filename()
    const formData = new FormData()
    formData.append(props.uploadFileKey, blobInfo.blob())
    formData.append(filename, filename)

    props
      .upload(formData)
      .then((res) => {
        success(joinBaseUrlFile(res.data.url))
      })
      .catch(() => {
        failure('上传失败')
      })
  }

  return {
    options: (props.upload
      ? {
          // 准许的图片格式
          images_file_types: 'jpeg,jpg,png,gif,bmp,webp',
          images_upload_handler: handleImgUpload
        }
      : {}) as Partial<RawEditorSettings>
  }
}
