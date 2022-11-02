import type {
  UserMenu,
  UserLoginParams,
  UserLoginResult,
  UserSigninParams
} from './types/loginTypes'
import service from '@/service'

enum Api {
  Login = '/api/user/login',
  Signin = '/api/user/signin',
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

export const userSignin = (data: UserSigninParams) => {
  return service.request({
    url: Api.Signin,
    method: 'POST',
    data
  })
}

// 用户菜单
export const getUserMenu = () => {
  return service.request<Service.Result<UserMenu[]>>({
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
