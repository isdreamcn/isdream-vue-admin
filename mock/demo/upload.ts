import type { MockMethod } from 'vite-plugin-mock'
import { HttpStatusCode } from '@/constants'
import { formatUrl, formatMsg } from '../_utils'

export default [
  {
    url: formatUrl('demo/upload'),
    method: 'post',
    timeout: 1000,
    statusCode: HttpStatusCode.OK,
    response: () => {
      return {
        data: {
          url: 'favicon.ico'
        },
        code: HttpStatusCode.OK,
        message: formatMsg('OK')
      }
    }
  }
] as MockMethod[]
