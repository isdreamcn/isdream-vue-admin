export interface UserLoginParams {
  username: string
  password: string
}

export interface UserSigninParams {
  username: string
  email: string
  password: string
  emailCaptcha: string
}

export interface UserResetPasswordParams {
  email: string
  password: string
  emailCaptcha: string
}

export interface UserLoginMenu {
  id?: number
  title?: string
  path: string
  icon?: string
  link?: string
  children?: UserLoginMenu[]
}

export interface UserLoginResult {
  token: string
  user: UserLoginInfo
}

export interface UserLoginInfo {
  id?: number
  username: string
  avatar?: string
}
