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
  [HttpStatusCode.Forbidden, { message: '403 (访问被拒绝)' }],
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
    // httpStatus通过, 进一步校验data.code
    responseInterceptor(res) {
      const { code, message } = res.data
      if (handleError(code, message)) {
        return Promise.reject({
          response: res
        })
      }

      // 只有code为200才算成功
      // if (code !== 200) {
      //   message && ElMessage.error(message)
      //   return Promise.reject({
      //     response: res
      //   })
      // }
      return res
    },
    // httpStatus不通过
    responseInterceptorCatch(err) {
      const handleRes: boolean[] = []

      // 处理无响应的情况（网络错误、请求超时等）
      if (!err.response) {
        if (err.code === 'ECONNABORTED') {
          ElMessage.error('请求超时，请稍后重试')
        } else if (err.message?.includes('Network Error')) {
          ElMessage.error('网络连接失败，请检查网络设置')
        } else {
          ElMessage.error(`请求失败: ${err.message || '未知错误'}`)
        }
        return Promise.reject(err)
      }

      const { code, message } = (err.response.data || {}) as {
        code?: number
        message?: string
      }

      // 处理业务错误码
      if (code !== undefined) {
        handleRes.push(handleError(code, message))
      }
      // 处理 HTTP 状态码（当与业务码不同时）
      if (code !== err.response.status) {
        handleRes.push(handleError(err.response.status, message))
      }
      // 兜底处理：若错误未被识别，则直接显示后端返回的消息
      if (message && !handleRes.includes(true)) {
        ElMessage.error(message)
      }
      return Promise.reject(err)
    }
  }
}
