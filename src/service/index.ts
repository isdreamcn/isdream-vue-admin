import { BasicRequest } from './basicRequest'
import { setupToken } from './interceptors'

export const service = new BasicRequest({
  interceptors: {
    requestInterceptor: setupToken
  }
})

export default service
