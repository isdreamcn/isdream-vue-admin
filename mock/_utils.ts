import type { IncomingMessage, ServerResponse } from 'http'
import type { RequestParams } from './_types'
import type { UserLoginResult } from '@/api/user/types/loginTypes'
import url from 'url'
import { HttpStatusCode } from '@/constants'

interface UserList extends UserLoginResult {
  username: string
  password: string
}

export const useUserList = (): UserList[] => {
  return [
    {
      id: 1,
      username: 'admin',
      password: '123456',
      token: '123456789',
      user: {
        id: 1,
        username: 'admin',
        email: '123456@mock.com'
      },
      // 路由
      menu: [
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

type RawResponseHandlerFn<T extends object> = (config: RequestParams<T>) => {
  data: any
  statusCode?: number
}

/**
 * @description: rawResponse => response
 */
// 生产模式rawResponse不支持
export const rawResponseHandler = <T extends object>(
  fn: RawResponseHandlerFn<T>
) => {
  return async (req: IncomingMessage, res: ServerResponse) => {
    let reqbody = ''
    await new Promise((resolve) => {
      req.on('data', (chunk: any) => {
        reqbody += chunk
      })
      req.on('end', () => resolve(undefined))
    })

    const config = {
      method: req.method,
      body: JSON.parse(reqbody),
      headers: req.headers,
      query: url.parse(req.url || '', true).query
    } as RequestParams<T>

    const { statusCode = HttpStatusCode.OK, data } = fn(config)

    res.statusCode = statusCode
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.end(JSON.stringify(data))
  }
}

interface ResultPaginationOptions {
  page: number
  pageSize: number
  count?: number
}

type DataItemFn = (index: number) => any

export const resultPagination = (
  dataItemFn: DataItemFn,
  options?: ResultPaginationOptions
): Service.ResultPagination => {
  const { page = 1, pageSize = 10, count = 100 } = options || {}
  const data: any[] = []
  const start = (page - 1) * pageSize
  const end = page * pageSize > count ? count : page * pageSize

  for (let i = start + 1; i <= end; i++) {
    data.push(dataItemFn(i))
  }
  return {
    data,
    count
  }
}
