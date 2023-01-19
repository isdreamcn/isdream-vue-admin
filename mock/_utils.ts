import type {
  UserLoginResult,
  UserLoginMenu
} from '@/api/user/types/login.type'

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
      token: '123456789',
      user: {
        id: 1,
        username: 'admin'
      },
      permissions: ['tableSearch'],
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
          path: '/system',
          children: [
            {
              id: 8,
              path: '/system/user'
            }
          ]
        }
      ]
    }
  ]
}

interface ResultPaginationOptions {
  page: number
  pageSize: number
  count?: number
}

// 生成分页数据
export const generateResultPagination = <T = any>(
  generater: (index: number) => T,
  options?: ResultPaginationOptions
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
