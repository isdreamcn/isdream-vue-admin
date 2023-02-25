import { CommonListParams } from '../../commonTypes'

export type GetDemoUserListParams = Omit<CommonListParams, 'q'>

export interface DemoUserData {
  name: string
  address: string
  email: string
  userInfo: UserInfo
  avatar: string
}

export interface DemoUser {
  id: number
  name: string
  address: string
  email: string
  userInfo: UserInfo
  avatar: string
  createAt: string
  updateAt: string
}

interface UserInfo {
  origin: string
}
