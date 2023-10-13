import type { MockMethod } from 'vite-plugin-mock'
import type { MockRequestParams } from '../_types'
import { useUserList, formatUrl, formatMsg } from '../_utils'
import { HttpStatusCode } from '@/constants'
import type {
  UserLoginMenu,
  UserLoginParams,
  UserLoginResult
} from '@/api/user/login'

export default [
  {
    url: formatUrl('user/login'),
    method: 'post',
    timeout: 100,
    response: ({ body }: MockRequestParams<UserLoginParams>) => {
      const userInfo = useUserList().find(
        ({ username, password }) =>
          username === body.username && password === body.password
      )
      if (userInfo) {
        return {
          code: HttpStatusCode.OK,
          data: userInfo
        } as Service.Result<UserLoginResult>
      }
      return {
        code: HttpStatusCode.Unauthorized,
        message: formatMsg('用户名或密码错误')
      }
    }
  },
  {
    url: formatUrl('user/signin'),
    method: 'post',
    timeout: 100,
    statusCode: HttpStatusCode.Not_Found,
    response: () => {
      return {
        code: HttpStatusCode.Not_Found,
        message: formatMsg('注册功能暂未开放')
      }
    }
  },
  {
    url: formatUrl('user/logout'),
    method: 'post',
    timeout: 100,
    statusCode: HttpStatusCode.OK,
    response: () => {
      return {
        code: HttpStatusCode.OK,
        message: formatMsg('退出登录成功')
      }
    }
  },
  {
    url: formatUrl('user/menu'),
    method: 'get',
    timeout: 100,
    response: ({ headers }: MockRequestParams) => {
      const token = headers?.authorization?.replaceAll('Bearer ', '')
      if (!token) {
        return {
          code: HttpStatusCode.Unauthorized,
          message: formatMsg('headers中不存在token')
        }
      }
      const userInfo = useUserList().find((item) => item.token === token)
      if (!userInfo) {
        return {
          code: HttpStatusCode.Unauthorized,
          message: formatMsg(`token:${token}校验失败`)
        }
      }
      return {
        code: HttpStatusCode.OK,
        data: userInfo.menus
      } as Service.Result<UserLoginMenu[]>
    }
  },
  {
    url: formatUrl('user/permissions'),
    method: 'get',
    timeout: 100,
    response: ({ headers }: MockRequestParams) => {
      const token = headers?.authorization?.replaceAll('Bearer ', '')
      if (!token) {
        return {
          code: HttpStatusCode.Unauthorized,
          message: formatMsg('headers中不存在token')
        }
      }
      const userInfo = useUserList().find((item) => item.token === token)
      if (!userInfo) {
        return {
          code: HttpStatusCode.Unauthorized,
          message: formatMsg(`token:${token}校验失败`)
        }
      }
      return {
        code: HttpStatusCode.OK,
        data: userInfo.permissions
      } as Service.Result<string[]>
    }
  }
] as MockMethod[]
