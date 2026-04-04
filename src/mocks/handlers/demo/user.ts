import { http, HttpResponse, delay } from 'msw'
import { HttpStatusCode } from '@/constants'
import {
  generateResultPagination,
  formatUrl,
  formatMsg,
  MOCK_DELAY
} from '../../utils'
import type { DemoUser } from '@/api/examples/user'

const BASE_URL = formatUrl('demo/user')

const CITIES = [
  '北京市',
  '上海市',
  '广州市',
  '深圳市',
  '杭州市',
  '成都市',
  '武汉市',
  '南京市'
]
const SURNAMES = ['张', '李', '王', '赵', '刘', '陈', '杨', '黄', '周', '吴']

/**
 * 生成模拟用户数据
 * @param id - 用户 ID
 * @returns 模拟用户对象
 */
const generateMockUser = (id: number): DemoUser => ({
  id,
  name: `${SURNAMES[id % SURNAMES.length]}用户${id}`,
  address: CITIES[id % CITIES.length],
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
  http.get(`${BASE_URL}/list`, async ({ request }) => {
    await delay(MOCK_DELAY.DEFAULT)
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') ?? '') || 1
    const pageSize = parseInt(url.searchParams.get('pageSize') ?? '') || 10

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
  }),

  http.post(`${BASE_URL}`, async () => {
    await delay(MOCK_DELAY.DEFAULT)
    return HttpResponse.json(
      {
        code: HttpStatusCode.OK,
        message: formatMsg('OK')
      } as Service.ResultEmpty,
      { status: HttpStatusCode.OK }
    )
  }),

  http.delete(`${BASE_URL}/:id`, async ({ params }) => {
    await delay(MOCK_DELAY.MODERATE)
    return HttpResponse.json(
      {
        code: HttpStatusCode.OK,
        message: formatMsg(`删除用户 ${params.id} 成功`)
      } as Service.ResultEmpty,
      { status: HttpStatusCode.OK }
    )
  }),

  http.put(`${BASE_URL}/:id`, async ({ params }) => {
    await delay(MOCK_DELAY.SLOW)
    return HttpResponse.json(
      {
        code: HttpStatusCode.OK,
        message: formatMsg(`更新用户 ${params.id} 成功`)
      } as Service.ResultEmpty,
      { status: HttpStatusCode.OK }
    )
  }),

  http.get(`${BASE_URL}/:id`, async ({ params }) => {
    await delay(MOCK_DELAY.NORMAL)
    const id = Number(params.id)
    return HttpResponse.json(
      {
        data: generateMockUser(id),
        code: HttpStatusCode.OK,
        message: formatMsg('OK')
      } as Service.Result<DemoUser>,
      { status: HttpStatusCode.OK }
    )
  })
]
