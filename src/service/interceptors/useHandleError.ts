import type { ServiceInterceptors } from '../service'
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
const failCodeMap = new Map<HttpStatusCode, FailHandler>([
  [HttpStatusCode.Unauthorized, { handler: failAuth }],
  [HttpStatusCode.Forbidden, { handler: failAuth }],
  [HttpStatusCode.Not_Found, { message: '404 (Not Found)' }],
  [
    HttpStatusCode.Internal_Server_Error,
    { message: '500 (Internal Server Error)' }
  ]
])

const handleError = (code: number, message?: string) => {
  const failHandler = failCodeMap.get(code)
  if (failHandler) {
    if (message || failHandler.message) {
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
      const data = res.data
      if (handleError(data.code, data.message)) {
        return Promise.reject({
          response: res
        })
      }
      return res
    },
    responseInterceptorCatch(err) {
      handleError(err.response.data?.code, err.response.data?.message)
      if (err.response.data?.code !== err.response.status) {
        handleError(err.response.status)
      }
      return Promise.reject(err)
    }
  }
}
