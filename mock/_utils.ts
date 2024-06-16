import type {
  UserLoginResult,
  UserLoginMenu
} from '@/api/user/types/login.type'

export const formatUrl = (url: string) => `/mockApi/${url}`
export const formatMsg = (msg: string) => `${msg} (mockApi)`

interface ResultTablePaginationOptions {
  page: number
  pageSize: number
  count?: number
}

// 生成分页数据
export const generateResultPagination = <T = any>(
  generater: (index: number) => T,
  options?: ResultTablePaginationOptions
): Service.ResultPagination<T[]> => {
  const { page = 1, pageSize = 10, count = 100 } = options || {}
  const data: any[] = []
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

interface MockUserLoginList extends UserLoginResult {
  username: string
  password: string
  menus: UserLoginMenu[]
  permissions: string[]
}

export const useUserList = (): MockUserLoginList[] => {
  return [
    {
      username: 'admin',
      password: '123456',
      token: 'ud1Ow3F7ofBFiHd3mOj1OBCKL',
      user: {
        id: 1,
        username: 'admin'
      },
      permissions: ['tableSearch', 'test'],
      // 路由
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
      // 路由
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
}
