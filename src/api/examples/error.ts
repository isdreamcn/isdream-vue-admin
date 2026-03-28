import { mockService } from '@/service'

enum Api {
  NotFound = 'demo/error/not_found'
}

export const demoErrorNotFound = () => {
  return mockService.request({
    url: Api.NotFound,
    method: 'GET'
  })
}
