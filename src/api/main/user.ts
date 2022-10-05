import service from '@/service'

enum Api {
  List = '/api/user/list'
}

export const getUserList = (params?: any) => {
  return service.request<Service.ResultPagination<any>>({
    method: 'GET',
    params,
    url: Api.List
  })
}
