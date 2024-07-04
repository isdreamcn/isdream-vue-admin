import type { CommonUploadFile } from './commonTypes'

export const uploadCommon = (formData: FormData) => {
  return new Promise<Service.Result<CommonUploadFile>>((resolve) => {
    setTimeout(() => {
      const bold = formData.get('file')
      if (bold && typeof bold !== 'string') {
        resolve({
          data: {
            url: URL.createObjectURL(bold),
            filename: bold.name,
            mimeType: bold.type
          }
        })
      }
    }, 2000)
  })
}

export * from './commonTypes'
