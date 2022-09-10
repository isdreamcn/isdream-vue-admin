import service from '@/service'

export interface UserLoginData {
  username: string
  password: string
}

export const userLogin = (data: UserLoginData) => {
  return service.request({
    url: '/api/user/login',
    method: 'POST',
    data
  })
}

export interface UserSigninData {
  username: string
  password: string
  email?: string
}

export const userSignin = (data: UserSigninData) => {
  return service.request({
    url: '/api/user/signin',
    method: 'POST',
    data
  })
}
