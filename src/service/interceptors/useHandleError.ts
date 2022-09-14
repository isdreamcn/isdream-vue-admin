import type { RequestInterceptors } from '../types'
import { ElMessage } from 'element-plus'
import { HttpStatusCode } from '@/constants'

import db from '@/storage'
import appConfig from '@/config'
import router from '@/router'

// 身份验证失败
const failAuth = () => {
  db.clear()
  router.push({
    name: appConfig.loginName
  })
}
interface FailHandler {
  msg?: string
  handler?: () => void
}

// 需要错误处理的状态码
const failCodeMap = new Map<HttpStatusCode, FailHandler>([
  [HttpStatusCode.Unauthorized, { handler: failAuth }],
  [HttpStatusCode.Forbidden, { handler: failAuth }],
  [HttpStatusCode.Not_Found, {}]
])

const handleError = (code: number, msg?: string) => {
  const failHandler = failCodeMap.get(code)
  if (failHandler) {
    if (msg || failHandler.msg) {
      ElMessage.error(msg || failHandler.msg)
    }
    if (failHandler.handler) {
      failHandler.handler()
    }
    return true
  }
  return false
}

export const useHandleError = (): RequestInterceptors => {
  return {
    responseInterceptor(config) {
      const data = config.data
      if (handleError(data.code, data.msg)) {
        throw { response: config }
      }
      return config
    },
    responseInterceptorCatch(err) {
      handleError(err.response.data?.code, err.response.data?.msg)
      handleError(err.response.status)
      return err
    }
  }
}
