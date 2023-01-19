import type { GetDemoUserListParams, DemoUser } from './types/user.type'
import service from '@/service'

enum Api {
  List = '/api/demo/user/list'
}

export const getDemoUserList = (params?: GetDemoUserListParams) => {
  return service.request<Service.ResultPagination<DemoUser[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

export * from './types/user.type'
