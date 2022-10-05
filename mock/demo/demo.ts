import type { MockMethod } from 'vite-plugin-mock'
import { HttpStatusCode } from '@/constants'

export default [
  {
    url: '/api/demo/list1',
    method: 'get',
    timeout: 1000,
    statusCode: HttpStatusCode.OK,
    response: () => {
      return {
        data: [{ id: 1, name: 'demo1' }],
        code: HttpStatusCode.OK,
        message: 'ok'
      }
    }
  },
  {
    url: '/api/demo/list2',
    method: 'get',
    timeout: 2000,
    statusCode: HttpStatusCode.Not_Found,
    response: () => {
      return {
        data: [],
        code: HttpStatusCode.Not_Found,
        message: 'demo测试错误'
      }
    }
  }
] as MockMethod[]
