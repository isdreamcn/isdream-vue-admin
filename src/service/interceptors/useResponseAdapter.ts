import type { ServiceInterceptors, ServiceResponse } from '../service'
import { isObject, isBlob } from '@/utils/plugins'

export const useResponseAdapter = (
  adapter: (row: any) => ServiceResponse
): ServiceInterceptors => {
  return {
    responseInterceptor(res) {
      if (isObject(res.data) && !isBlob(res.data)) {
        res.data = adapter(res.data)
      }
      return res
    },
    responseInterceptorCatch(err) {
      if (isObject(err.response?.data) && !isBlob(err.response?.data)) {
        err.response.data = adapter(err.response.data)
      }
      return Promise.reject(err)
    }
  }
}
