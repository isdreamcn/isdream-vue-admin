import type {
  GetDemoUserListParams,
  DemoUser,
  DemoUserData
} from './types/user.type'
import service from '@/service'

enum Api {
  List = '/api/demo/user',
  Add = '/api/demo/user',
  Del = '/api/demo/user',
  Edit = '/api/demo/user',
  Details = '/api/demo/user'
}

// 用户列表
export const getDemoUserList = (params?: GetDemoUserListParams) => {
  return service.request<Service.ResultPagination<DemoUser[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

// 新增
export const demoUserAdd = (data: DemoUserData) => {
  return service.request<Service.Result>({
    url: Api.Add,
    method: 'POST',
    data
  })
}

// 删除
export const demoUserDel = (id: number) => {
  return service.request<Service.Result>({
    url: `${Api.Del}/${id}`,
    method: 'DELETE'
  })
}

// 编辑
export const demoUserEdit = (id: number, data: DemoUserData) => {
  return service.request<Service.Result>({
    url: `${Api.Edit}/${id}`,
    method: 'PUT',
    data
  })
}

// 详情
export const demoUserDetails = (id: number) => {
  return service.request<Service.Result<DemoUser>>({
    url: `${Api.Details}/${id}`,
    method: 'GET'
  })
}

export * from './types/user.type'
