import type { ServiceInterceptors, ServiceError } from '../service'
import { ElMessage } from 'element-plus'
import { HttpStatusCode } from '@/constants'
import { useUserStore } from '@/store'

// 身份验证失败
const failAuth = () => {
  useUserStore().logout()
}
interface FailHandler {
  message?: string
  handler?: () => void
}

// 需要错误处理的状态码
const failCodeMap = new Map<number, FailHandler>([
  [HttpStatusCode.Bad_Request, { message: '请求参数错误' }],
  [HttpStatusCode.Unauthorized, { handler: failAuth }],
  [HttpStatusCode.Forbidden, { message: '访问被拒绝' }],
  [HttpStatusCode.Not_Found, { message: '请求的资源不存在' }],
  [HttpStatusCode.Internal_Server_Error, { message: '服务器内部错误' }]
])

const handleError = (code: number, message?: string, skipMessage = false) => {
  const failHandler = failCodeMap.get(code)
  if (failHandler) {
    if (!skipMessage && (message || failHandler.message)) {
      ElMessage.error(message || failHandler.message)
    }
    if (failHandler.handler) {
      failHandler.handler()
    }
    return true
  }
  return false
}

export const useHandleError = (): ServiceInterceptors => {
  return {
    responseInterceptor(res) {
      const { code, message } = res.data
      if (handleError(code, message, res.config._silentError)) {
        return Promise.reject({ code, message, response: res })
      }

      // 只有code为200才算成功
      // if (code !== 200) {
      //   if (message) {
      //     ElMessage.error(message)
      //   }
      //   return Promise.reject({
      //     response: res
      //   })
      // }
      return res
    },
    responseInterceptorCatch(err): Promise<ServiceError> {
      const skipMessage = err.config?._silentError

      // 处理无响应的情况（网络错误、请求超时等）
      if (!err.response) {
        const message =
          err.code === 'ECONNABORTED'
            ? '请求超时，请稍后重试'
            : err.message?.includes('Network Error')
              ? '网络连接失败，请检查网络设置'
              : `请求失败: ${err.message || '未知错误'}`
        if (!skipMessage) {
          ElMessage.error(message)
        }
        return Promise.reject({ message })
      }

      const { code, message } = (err.response.data || {}) as {
        code?: number
        message?: string
      }

      if (code !== undefined && handleError(code, message, skipMessage)) {
        return Promise.reject({ code, message, response: err.response })
      }
      if (
        code !== err.response.status &&
        handleError(err.response.status, message, skipMessage)
      ) {
        return Promise.reject({
          code: err.response.status,
          message,
          response: err.response
        })
      }
      if (message && !skipMessage) {
        ElMessage.error(message)
      }
      return Promise.reject({ code, message, response: err.response })
    }
  }
}
