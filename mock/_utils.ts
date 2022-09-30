import type { IncomingMessage, ServerResponse } from 'http'
import type { requestParams } from './_types'
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
          pathKey: '/home',
          icon: 'iconfont-shoucang'
        },
        {
          id: 2,
          pathKey: '/about'
        },
        {
          id: 3,
          pathKey: '/menu',
          children: [
            {
              id: 4,
              pathKey: '/menu/menu1',
              children: [
                {
                  id: 5,
                  pathKey: '/menu/menu1/menu11'
                }
              ]
            },
            {
              id: 6,
              pathKey: '/menu/menu2'
            }
          ]
        },
        {
          id: 7,
          pathKey: '/system',
          children: [
            {
              id: 8,
              pathKey: '/system/user'
            }
          ]
        },
        {
          id: 9,
          pathKey: '/link'
        }
      ]
    }
  ]
}

type rawResponseHandlerFn<T extends object> = (config: requestParams<T>) => {
  data: any
  statusCode?: number
}

/**
 * @description: rawResponse => response
 */
// 生产模式rawResponse不支持
export const rawResponseHandler = <T extends object>(
  fn: rawResponseHandlerFn<T>
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
    } as requestParams<T>

    const { statusCode = HttpStatusCode.OK, data } = fn(config)

    res.statusCode = statusCode
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.end(JSON.stringify(data))
  }
}
