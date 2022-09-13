import type {
  UserLoginParams,
  UserLoginResult,
  UserSigninParams
} from './types/loginTypes'
import service from '@/service'

enum Api {
  Login = '/api/user/login',
  Signin = '/api/user/signin'
}

export const userLogin = (data: UserLoginParams) => {
  return service.request<UserLoginResult>({
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
