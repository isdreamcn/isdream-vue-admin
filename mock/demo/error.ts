import type { MockMethod } from 'vite-plugin-mock'
import { HttpStatusCode } from '@/constants'

export default [
  {
    url: '/api/demo/error/not_found',
    method: 'get',
    timeout: 2000,
    statusCode: HttpStatusCode.Not_Found,
    response: () => {
      return {
        code: HttpStatusCode.Not_Found,
        message: 'mock测试错误, Not_Found'
      }
    }
  }
] as MockMethod[]
