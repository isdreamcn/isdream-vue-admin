import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

/**
 * MSW 浏览器端 Worker 实例
 * 用于在浏览器环境中拦截请求
 */
export const worker = setupWorker(...handlers)
