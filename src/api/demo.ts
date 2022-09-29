import service from '@/service'

enum Api {
  List1 = '/api/demo/list1',
  List2 = '/api/demo/list2'
}

export const getDemoList1 = (params: any = {}) => {
  return service.request<Service.Result<any>>({
    url: Api.List1,
    method: 'GET',
    params
  })
}

export const getDemoList2 = (params: any = {}) => {
  return service.request<Service.Result<any>>({
    url: Api.List2,
    method: 'GET',
    params
  })
}
