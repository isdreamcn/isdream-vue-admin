import { userLoginHandlers } from './user/login'
import { demoUserHandlers } from './demo/user'
import { demoErrorHandlers } from './demo/error'
import { demoUploadHandlers } from './demo/upload'

/**
 * 所有 Mock 处理器的汇总导出
 */
export const handlers = [
  ...userLoginHandlers,
  ...demoUserHandlers,
  ...demoErrorHandlers,
  ...demoUploadHandlers
]
