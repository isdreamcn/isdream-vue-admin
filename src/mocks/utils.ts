import { HttpResponse, type DefaultBodyType } from 'msw'
import { HttpStatusCode } from '@/constants'
import type {
  UserLoginResult,
  UserLoginMenu
} from '@/api/user/types/login.type'

/**
 * 格式化 Mock API URL
 * @param url - API 路径
 * @returns 带有 mockApi 前缀的完整 URL
 */
export const formatUrl = (url: string) => `/mockApi/${url}`

/**
 * 格式化 Mock API 响应消息
 * @param msg - 原始消息
 * @returns 带有 mockApi 标识的消息
 */
export const formatMsg = (msg: string) => `${msg} (mockApi)`

/**
 * Mock API 延迟时间常量
 * 按操作类型区分，用于模拟真实网络延迟
 */
export const MOCK_DELAY = {
  /** 快速操作（认证接口） */
  FAST: 100,
  /** 标准操作（详情查询） */
  NORMAL: 500,
  /** 默认操作（列表/创建/上传） */
  DEFAULT: 1000,
  /** 较慢操作（删除） */
  MODERATE: 1500,
  /** 慢速操作（更新/错误模拟） */
  SLOW: 2000
} as const

interface ResultTablePaginationOptions {
  page: number
  pageSize: number
  count?: number
}

/**
 * 生成分页数据
 * @param generater - 数据生成函数
 * @param options - 分页选项
 * @returns 分页结果
 */
export const generateResultPagination = <T>(
  generater: (index: number) => T,
  options?: ResultTablePaginationOptions
): Service.ResultPagination<T[]> => {
  const { page = 1, pageSize = 10, count = 100 } = options || {}
  const data: T[] = []
  const start = (page - 1) * pageSize
  const end = page * pageSize > count ? count : page * pageSize

  for (let i = start + 1; i <= end; i++) {
    data.push(generater(i))
  }
  return {
    data,
    count
  }
}

export interface MockUserLoginList extends UserLoginResult {
  username: string
  password: string
  menus: UserLoginMenu[]
  permissions: string[]
}

/**
 * 模拟用户列表数据
 */
const USER_LIST: MockUserLoginList[] = [
  {
    username: 'admin',
    password: '123456',
    token: 'ud1Ow3F7ofBFiHd3mOj1OBCKL',
    user: {
      id: 1,
      username: 'admin'
    },
    permissions: ['tableSearch', 'test'],
    menus: []
  },
  {
    username: 'test',
    password: '123456',
    token: 'uRP85yE5kBTtzBa2jTC4G5MtG',
    user: {
      id: 2,
      username: 'test'
    },
    permissions: [
      '/home',
      '/about',
      '/demo',
      '/demo/link',
      '/demo/show-loading',
      '/demo/menu',
      '/demo/menu/menu1',
      '/demo/menu/menu1/menu11',
      '/demo/menu/menu2',
      '/example',
      '/example/user'
    ],
    menus: [
      {
        id: 1,
        title: '首页MockRole',
        path: '/home',
        icon: 'iconfont-shoucang'
      },
      {
        id: 2,
        path: '/about'
      },
      {
        id: 9,
        path: '/demo/link'
      },
      {
        id: 10,
        path: '/demo/show-loading'
      },
      {
        id: 3,
        path: '/demo/menu',
        children: [
          {
            id: 4,
            path: '/demo/menu/menu1',
            children: [
              {
                id: 5,
                path: '/demo/menu/menu1/menu11'
              }
            ]
          },
          {
            id: 6,
            path: '/demo/menu/menu2'
          }
        ]
      },
      {
        id: 7,
        icon: 'icon-user',
        path: '/example/user'
      }
    ]
  }
]

/**
 * 获取模拟用户列表
 * @returns 用户列表数据
 */
export const useUserList = (): MockUserLoginList[] => USER_LIST

/**
 * 从 Authorization header 中提取 token
 * 支持 Bearer token 格式（不区分大小写）
 * @param authorization - Authorization header 值
 * @returns 提取的 token 或 null
 */
export const extractToken = (authorization: string | null): string | null => {
  if (!authorization) return null
  const match = authorization.match(/^bearer\s+(.+)$/i)
  return match ? match[1] : null
}

/**
 * 验证 token 并返回对应用户信息
 * @param request - MSW 请求对象
 * @returns [错误响应, 用户信息] 元组，错误响应非 null 表示验证失败
 */
export const validateTokenAndGetUser = (
  request: Request
): [HttpResponse<DefaultBodyType> | null, MockUserLoginList | null] => {
  const authorization = request.headers.get('authorization')
  const token = extractToken(authorization)
  if (!token) {
    return [
      HttpResponse.json(
        {
          code: HttpStatusCode.Unauthorized,
          message: formatMsg('headers中不存在token')
        },
        { status: HttpStatusCode.OK }
      ),
      null
    ]
  }
  const userInfo = useUserList().find(
    (item: MockUserLoginList) => item.token === token
  )
  if (!userInfo) {
    return [
      HttpResponse.json(
        {
          code: HttpStatusCode.Unauthorized,
          message: formatMsg(`token:${token}校验失败`)
        },
        { status: HttpStatusCode.OK }
      ),
      null
    ]
  }
  return [null, userInfo]
}
