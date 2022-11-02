import type { MockMethod } from 'vite-plugin-mock'
import type { RequestParams } from '../_types'
import type {
  UserLoginParams,
  UserSigninParams
} from '@/api/user/types/loginTypes'
import {
  useUserList
  /* rawResponseHandler */
} from '../_utils'
import { HttpStatusCode } from '@/constants'

export default [
  {
    url: '/api/user/login',
    method: 'post',
    timeout: 200,
    response: ({ body }: RequestParams<UserLoginParams>) => {
      const userInfo = useUserList().find(
        ({ username, password }) =>
          username === body.username && password === body.password
      )
      if (userInfo) {
        return {
          code: HttpStatusCode.OK,
          data: userInfo
        }
      }
      return {
        code: HttpStatusCode.Unauthorized,
        message: '用户名或密码错误'
      }
    }
  },

  {
    url: '/api/user/signin',
    method: 'post',
    timeout: 200,
    statusCode: HttpStatusCode.Not_Found,
    response: ({ body }: RequestParams<UserSigninParams>) => {
      return {
        data: body,
        code: HttpStatusCode.Not_Found,
        message: '注册功能暂未开放'
      }
    }
    // 生产模式rawResponse不支持
    // rawResponse: rawResponseHandler<UserSigninParams>(() => {
    //   return {
    //     data: {
    //       message: '拒绝注册',
    //       code: HttpStatusCode.Not_Found
    //     },
    //     statusCode: HttpStatusCode.Not_Found
    //   }
    // })
  },
  {
    url: '/api/user/menu',
    method: 'get',
    timeout: 1000,
    response: ({ headers }: RequestParams) => {
      const token = headers?.authorization?.replaceAll('Bearer ', '')
      if (!token) {
        return {
          code: HttpStatusCode.Unauthorized,
          message: 'headers中不存在token'
        }
      }
      const userInfo = useUserList().find((item) => item.token === token)
      if (!userInfo) {
        return {
          code: HttpStatusCode.Not_Found,
          data: []
        }
      }
      return {
        code: HttpStatusCode.OK,
        data: userInfo.menu
      }
    }
  },
  {
    url: '/api/user/permissions',
    method: 'get',
    timeout: 1000,
    response: ({ headers }: RequestParams) => {
      const token = headers?.authorization?.replaceAll('Bearer ', '')
      if (!token) {
        return {
          code: HttpStatusCode.Unauthorized,
          message: 'headers中不存在token'
        }
      }
      const userInfo = useUserList().find((item) => item.token === token)
      if (!userInfo) {
        return {
          code: HttpStatusCode.Not_Found,
          data: []
        }
      }
      return {
        code: HttpStatusCode.OK,
        data: userInfo.permissions
      }
    }
  }
] as MockMethod[]
