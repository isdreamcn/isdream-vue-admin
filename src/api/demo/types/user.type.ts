export interface GetDemoUserListParams {
  page?: number
  pageSize?: number
}

export interface DemoUser {
  id: number
  name: string
  address: string
  email: string
  UserInfo: UserInfo
  avatar: string
  createAt: string
  updateAt: string
}

interface UserInfo {
  origin: string
}
