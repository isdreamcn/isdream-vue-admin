import type { CommonUploadFile } from './commonTypes'

export const uploadCommon = (formData: FormData) => {
  return new Promise<Service.Result<CommonUploadFile>>((resolve, reject) => {
    setTimeout(() => {
      const blob = formData.get('file')
      if (blob && typeof blob !== 'string') {
        resolve({
          data: {
            url: URL.createObjectURL(blob),
            filename: blob.name,
            mimeType: blob.type
          }
        })
      } else {
        reject(new Error('文件不能为空'))
      }
    }, 2000)
  })
}

export * from './commonTypes'
