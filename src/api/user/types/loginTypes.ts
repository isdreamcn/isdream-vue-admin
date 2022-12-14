export interface UserLoginParams {
  username: string
  password: string
}

export interface UserMenu {
  id: number
  title?: string
  path: string
  icon?: string
  link?: string
  children?: UserMenu[]
}

export interface UserInfo {
  id: number
  username: string
  realname?: string
  email: string
  avatar?: string
}

export interface UserLoginResult {
  id: number
  token: string
  menu: UserMenu[]
  permissions: string[]
  user: UserInfo
}

export interface UserSigninParams {
  username: string
  password: string
  email?: string
}
