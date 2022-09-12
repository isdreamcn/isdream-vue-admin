import type { IncomingMessage, ServerResponse } from 'http'
import type { requestParams } from './_types'
import url from 'url'
import httpStatusCode from '@/constants/httpStatusCode'

export const useUserList = () => {
  return [
    {
      id: 1,
      username: 'admin',
      password: '123456',
      token: '123456789',
      user: {},
      // 路由
      menu: [
        {
          id: 1,
          title: '系统总览',
          // 路由name
          name: '',
          icon: '',
          children: []
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

    const { statusCode = httpStatusCode.ok, data } = fn(config)

    res.statusCode = statusCode
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.end(JSON.stringify(data))
  }
}
