import { http, HttpResponse, delay } from 'msw'
import { HttpStatusCode } from '@/constants'
import { generateResultPagination, formatUrl, formatMsg } from '../../utils'
import type { DemoUser } from '@/api/examples/user'

const BASE_URL = formatUrl('demo/user')

/**
 * 生成模拟用户数据
 * @param id - 用户 ID
 * @returns 模拟用户对象
 */
const generateMockUser = (id: number): DemoUser => ({
  id,
  name: `用户${id}`,
  address: '北京市',
  email: `user${id}@example.com`,
  userInfo: {
    origin: 'mockApi'
  },
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
  createAt: new Date().toISOString(),
  updateAt: new Date().toISOString()
})

/**
 * Demo 用户相关的 Mock 处理器
 * 包含用户列表查询、创建、删除、更新、详情查询等接口
 */
export const demoUserHandlers = [
  http.get(
    `${BASE_URL}/list`,
    async ({ request }) => {
      await delay(1000)
      const url = new URL(request.url)
      const page = parseInt(url.searchParams.get('page') || '1')
      const pageSize = parseInt(url.searchParams.get('pageSize') || '55')

      return HttpResponse.json(
        {
          ...generateResultPagination(generateMockUser, {
            page,
            pageSize,
            count: 55
          }),
          code: HttpStatusCode.OK,
          message: formatMsg('OK')
        } as Service.ResultPagination<DemoUser[]>,
        { status: HttpStatusCode.OK }
      )
    }
  ),

  http.post(
    `${BASE_URL}`,
    async () => {
      await delay(1000)
      return HttpResponse.json(
        {
          code: HttpStatusCode.OK,
          message: formatMsg('OK')
        } as Service.Result,
        { status: HttpStatusCode.OK }
      )
    }
  ),

  http.delete(
    `${BASE_URL}/:id`,
    async ({ params }) => {
      await delay(1500)
      return HttpResponse.json(
        {
          code: HttpStatusCode.OK,
          message: formatMsg(`删除用户 ${params.id} 成功`)
        } as Service.Result,
        { status: HttpStatusCode.OK }
      )
    }
  ),

  http.put(
    `${BASE_URL}/:id`,
    async ({ params }) => {
      await delay(2000)
      return HttpResponse.json(
        {
          code: HttpStatusCode.OK,
          message: formatMsg(`更新用户 ${params.id} 成功`)
        } as Service.Result,
        { status: HttpStatusCode.OK }
      )
    }
  ),

  http.get(
    `${BASE_URL}/:id`,
    async ({ params }) => {
      await delay(500)
      const id = Number(params.id)
      return HttpResponse.json(
        {
          data: generateMockUser(id),
          code: HttpStatusCode.OK,
          message: formatMsg('OK')
        } as Service.Result<DemoUser>,
        { status: HttpStatusCode.OK }
      )
    }
  )
]
