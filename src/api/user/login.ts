import type { RouteRecordRaw } from 'vue-router'
import type {
  UserLoginMenu,
  UserLoginParams,
  UserLoginResult,
  UserSigninParams,
  UserResetPasswordParams
} from './types/login.type'
import { mockService } from '@/service'

import { appConfig } from '@/config'
import db from '@/storage'
import { routes } from '@/router/routes'
import { processRoutes } from '@/router/useRoutesHandler/utils'

const ADMIN_TOKEN = 'ud1Ow3F7ofBFiHd3mOj1OBCKL'

enum Api {
  Login = 'user/login',
  Signin = 'user/signin',
  ResetPassword = 'user/reset_password',
  Logout = 'user/logout',
  Menu = 'user/menu',
  Permissions = 'user/permissions'
}

export const userLogin = (data: UserLoginParams) => {
  return mockService.request<Service.Result<UserLoginResult>>({
    url: Api.Login,
    method: 'POST',
    data,
    _silentError: true
  })
}

// 注册
export const userSignin = (data: UserSigninParams) => {
  return mockService.request({
    url: Api.Signin,
    method: 'POST',
    data,
    _silentError: true
  })
}

// 重置密码
export const userResetPassword = (data: UserResetPasswordParams) => {
  return mockService.request({
    url: Api.ResetPassword,
    method: 'POST',
    data,
    _silentError: true
  })
}

// 退出登录
export const userLogout = () => {
  return mockService.request({
    url: Api.Logout,
    method: 'POST'
  })
}

// 用户菜单
export const getRoleMenu = () => {
  return mockService
    .request<Service.Result<UserLoginMenu[]>>({
      url: Api.Menu,
      method: 'GET'
    })
    .then((res) => {
      // mockUser: admin
      if (
        appConfig.routesHandlerOptions.setupRoutesType === 'roleMenu' &&
        db.get('token') === ADMIN_TOKEN
      ) {
        return {
          ...res,
          data: processRoutes(routes)
        }
      }
      return res
    })
}

// 用户按钮权限
export const getUserPermissions = () => {
  return mockService
    .request<Service.Result<string[]>>({
      url: Api.Permissions,
      method: 'GET'
    })
    .then((res) => {
      // mockUser: admin
      if (
        appConfig.routesHandlerOptions.setupRoutesType === 'permissions' &&
        db.get('token') === ADMIN_TOKEN
      ) {
        return {
          ...res,
          data: getRoutesPermissions(processRoutes(routes)).concat(res.data)
        }
      }
      return res
    })
}

export * from './types/login.type'

function getRoutesPermissions(
  routes: RouteRecordRaw[],
  permissions: string[] = []
) {
  routes.forEach((route) => {
    permissions.push(route.path)
    if (route.children) {
      getRoutesPermissions(route.children, permissions)
    }
  })
  return permissions
}
