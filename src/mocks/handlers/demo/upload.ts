import { http, HttpResponse, delay } from 'msw'
import { HttpStatusCode } from '@/constants'
import { formatUrl, formatMsg, MOCK_DELAY } from '../../utils'

const BASE_URL = formatUrl('demo/upload')

/**
 * Demo 上传相关的 Mock 处理器
 * 用于测试文件上传功能
 */
export const demoUploadHandlers = [
  http.post(`${BASE_URL}`, async () => {
    await delay(MOCK_DELAY.DEFAULT)
    return HttpResponse.json(
      {
        data: {
          url: 'favicon.ico'
        },
        code: HttpStatusCode.OK,
        message: formatMsg('OK')
      },
      { status: HttpStatusCode.OK }
    )
  })
]
