import { http, HttpResponse, delay } from 'msw'
import { HttpStatusCode } from '@/constants'
import { formatUrl, formatMsg, MOCK_DELAY } from '../../utils'

const BASE_URL = formatUrl('demo/error')

/**
 * Demo 错误相关的 Mock 处理器
 * 用于测试各种错误响应场景
 */
export const demoErrorHandlers = [
  http.get(`${BASE_URL}/not_found`, async () => {
    await delay(MOCK_DELAY.SLOW)
    return HttpResponse.json(
      {
        code: HttpStatusCode.Not_Found,
        message: formatMsg('测试错误, Not_Found')
      },
      { status: HttpStatusCode.Not_Found }
    )
  })
]
