import { UploadReset } from './commonTypes'
import service from '@/service'

enum Api {
  Upload = '/api/demo/upload'
}

export const upload = (formData: FormData) => {
  return service.request<Service.Result<UploadReset>>({
    url: Api.Upload,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData
  })
}
