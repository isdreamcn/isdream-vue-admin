import type { MockMethod } from 'vite-plugin-mock'
import type {
  UserLoginParams,
  UserSigninParams
} from '@/api/user/types/loginTypes'
import { useUserList, rawResponseHandler } from '../_utils'
import HttpStatusCode from '@/constants/httpStatusCode'

export default [
  {
    url: '/api/user/login',
    method: 'post',
    timeout: 200,
    rawResponse: rawResponseHandler<UserLoginParams>(({ body }) => {
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
        statusCode: HttpStatusCode.Unauthorized
      }
    })
  },

  {
    url: '/api/user/signin',
    method: 'post',
    timeout: 200,
    rawResponse: rawResponseHandler<UserSigninParams>(() => {
      return {
        data: {
          msg: '拒绝注册'
        },
        statusCode: HttpStatusCode.Not_Found
      }
    })
  }
] as MockMethod[]
