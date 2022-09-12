import type { MockMethod } from 'vite-plugin-mock'
import type { UserLoginData, UserSigninData } from '@/api/user/login'
import { useUserList, rawResponseHandler } from '../_utils'
import httpStatusCode from '@/constants/httpStatusCode'

export default [
  {
    url: '/api/user/login',
    method: 'post',
    timeout: 200,
    rawResponse: rawResponseHandler<UserLoginData>(({ body }) => {
      const userInfo = useUserList().find(
        ({ username, password }) =>
          username === body.username && password === body.password
      )
      if (userInfo) {
        return {
          data: userInfo
        }
      }
      return {
        data: {
          msg: '用户名或密码错误'
        },
        statusCode: httpStatusCode.unauthorized
      }
    })
  },

  {
    url: '/api/user/signin',
    method: 'post',
    timeout: 200,
    rawResponse: rawResponseHandler<UserSigninData>(() => {
      return {
        data: {
          msg: '拒绝注册'
        },
        statusCode: httpStatusCode.notFound
      }
    })
  }
] as MockMethod[]
