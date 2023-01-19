import service from '@/service'

enum Api {
  NotFount = '/api/demo/error/not_found'
}

export const demoErrorNotFount = () => {
  return service.request({
    url: Api.NotFount,
    method: 'GET'
  })
}
