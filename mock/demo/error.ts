import type { MockMethod } from 'vite-plugin-mock'
import { HttpStatusCode } from '@/constants'
import { formatUrl, formatMsg } from '../_utils'

export default [
  {
    url: formatUrl('demo/error/not_found'),
    method: 'get',
    timeout: 2000,
    statusCode: HttpStatusCode.Not_Found,
    response: () => {
      return {
        code: HttpStatusCode.Not_Found,
        message: formatMsg('测试错误, Not_Found')
      }
    }
  }
] as MockMethod[]
