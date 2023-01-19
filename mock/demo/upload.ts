import type { MockMethod } from 'vite-plugin-mock'
import { HttpStatusCode } from '@/constants'

export default [
  {
    url: '/api/demo/upload',
    method: 'post',
    timeout: 1000,
    statusCode: HttpStatusCode.OK,
    response: () => {
      return {
        data: {
          url: 'favicon.ico'
        },
        code: HttpStatusCode.OK,
        message: 'ok'
      }
    }
  }
] as MockMethod[]
