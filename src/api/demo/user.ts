import type {
  GetDemoUserListParams,
  DemoUser,
  DemoUserData
} from './types/user.type'
import { mockService } from '@/service'

enum Api {
  List = 'demo/user/list',
  Add = 'demo/user',
  Del = 'demo/user',
  Edit = 'demo/user',
  Details = 'demo/user'
}

// 用户列表
export const getDemoUserList = (params?: GetDemoUserListParams) => {
  return mockService.request<Service.ResultPagination<DemoUser[]>>({
    url: Api.List,
    method: 'GET',
    params
  })
}

// 新增
export const demoUserAdd = (data: DemoUserData) => {
  return mockService.request<Service.Result>({
    url: Api.Add,
    method: 'POST',
    data
  })
}

// 删除
export const demoUserDel = (id: number) => {
  return mockService.request<Service.Result>({
    url: `${Api.Del}/${id}`,
    method: 'DELETE'
  })
}

// 编辑
export const demoUserEdit = (id: number, data: DemoUserData) => {
  return mockService.request<Service.Result>({
    url: `${Api.Edit}/${id}`,
    method: 'PUT',
    data
  })
}

// 详情
export const demoUserDetails = (id: number) => {
  return mockService.request<Service.Result<DemoUser>>({
    url: `${Api.Details}/${id}`,
    method: 'GET'
  })
}

export * from './types/user.type'
