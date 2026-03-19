import { setupServer } from 'msw/node'
import { handlers } from './handlers'

/**
 * MSW Node 端 Server 实例
 * 用于在 Node 环境（如单元测试）中拦截请求
 */
export const server = setupServer(...handlers)
