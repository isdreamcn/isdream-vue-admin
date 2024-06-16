import type { RouteRecordRaw } from 'vue-router'
import type {
  UserLoginMenu,
  UserLoginParams,
  UserLoginResult
} from './types/login.type'
import { mockService } from '@/service'

import { appConfig } from '@/config'
import db from '@/storage'
import { routes } from '@/router/routes'
import { joinRoutesPath, sortRoutes } from '@/router/useRoutesHandler/utils'

enum Api {
  Login = 'user/login',
  Signin = 'user/signin',
  Logout = 'user/logout',
  Menu = 'user/menu',
  Permissions = 'user/permissions'
}

export const userLogin = (data: UserLoginParams) => {
  return mockService.request<Service.Result<UserLoginResult>>({
    url: Api.Login,
    method: 'POST',
    data
  })
}

// 注册
export const userSignin = (data: any) => {
  return mockService.request({
    url: Api.Signin,
    method: 'POST',
    data
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
        db.get('token') === 'ud1Ow3F7ofBFiHd3mOj1OBCKL'
      ) {
        return {
          ...res,
          data: joinRoutesPath(sortRoutes(routes))
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
        db.get('token') === 'ud1Ow3F7ofBFiHd3mOj1OBCKL'
      ) {
        return {
          ...res,
          data: getRoutesPermissions(joinRoutesPath(sortRoutes(routes))).concat(
            res.data
          )
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
