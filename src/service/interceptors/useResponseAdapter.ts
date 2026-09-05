import type { ServiceInterceptors, ServiceResponse } from '../service'
import { isObject, isBlob } from '@/utils/plugins'

/**
 * 响应适配器：后端响应结构与 ServiceResponse 不一致时，
 * 将原始响应数据映射为标准结构（Blob 等二进制数据不做转换）
 */
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
