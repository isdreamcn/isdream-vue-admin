import { mockService } from '@/service'

enum Api {
  NotFount = 'demo/error/not_found'
}

export const demoErrorNotFount = () => {
  return mockService.request({
    url: Api.NotFount,
    method: 'GET'
  })
}
