import type { RequestInterceptors } from '../types'
import { ElMessage } from 'element-plus'
import HttpStatusCode from '@/constants/httpStatusCode'

interface FailHandler {
  msg?: string
  handler?: () => void
}
const failCodeMap = new Map<HttpStatusCode, FailHandler>([
  [HttpStatusCode.Unauthorized, {}]
])

export const useHandleError = (): RequestInterceptors => {
  return {
    responseInterceptor(config) {
      const data = config.data
      const failHandler = failCodeMap.get(data.code)
      if (failHandler) {
        const { msg, handler } = failHandler
        if (data.msg || msg) {
          ElMessage.error(data.msg || msg)
        }
        if (handler) {
          handler()
        }
        throw { response: config }
      }
      return config
    }
  }
}
