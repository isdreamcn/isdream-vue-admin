import type { UploadFile } from './commonTypes'

export const uploadCommon = (formData: FormData) => {
  return new Promise<Service.Result<UploadFile>>((resolve) => {
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
    }, 500)
  })
}

export * from './commonTypes'
