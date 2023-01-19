import { DemoUploadReset } from './types/upload.type'
import service from '@/service'

enum Api {
  Upload = '/api/demo/upload'
}

export const demoUpload = (formData: FormData) => {
  return service.request<Service.Result<DemoUploadReset>>({
    url: Api.Upload,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData
  })
}
