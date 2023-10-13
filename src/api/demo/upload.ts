import { DemoUploadReset } from './types/upload.type'
import { mockService } from '@/service'

enum Api {
  Upload = 'demo/upload'
}

export const demoUpload = (formData: FormData) => {
  return mockService.request<Service.Result<DemoUploadReset>>({
    url: Api.Upload,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData
  })
}
