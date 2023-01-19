import type {
  UserLoginMenu,
  UserLoginParams,
  UserLoginResult
} from './types/login.type'
import service from '@/service'

enum Api {
  Login = '/api/user/login',
  Signin = '/api/user/signin',
  Logout = '/api/user/logout',
  Menu = '/api/user/menu',
  Permissions = '/api/user/permissions'
}

export const userLogin = (data: UserLoginParams) => {
  return service.request<Service.Result<UserLoginResult>>({
    url: Api.Login,
    method: 'POST',
    data
  })
}

// 注册
export const userSignin = (data: any) => {
  return service.request({
    url: Api.Signin,
    method: 'POST',
    data
  })
}

// 退出登录
export const userLogout = () => {
  return service.request({
    url: Api.Logout,
    method: 'POST'
  })
}

// 用户菜单
export const getUserMenu = () => {
  return service.request<Service.Result<UserLoginMenu[]>>({
    url: Api.Menu,
    method: 'GET'
  })
}

// 用户按钮权限
export const getUserPermissions = () => {
  return service.request<Service.Result<string[]>>({
    url: Api.Permissions,
    method: 'GET'
  })
}

export * from './types/login.type'
