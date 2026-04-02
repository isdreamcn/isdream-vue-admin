import { http, HttpResponse, delay } from 'msw'
import { HttpStatusCode } from '@/constants'
import {
  useUserList,
  formatUrl,
  formatMsg,
  MOCK_DELAY,
  validateTokenAndGetUser,
  type MockUserLoginList
} from '../../utils'
import type {
  UserLoginMenu,
  UserLoginParams,
  UserLoginResult
} from '@/api/user/login'

const BASE_URL = formatUrl('user')

/**
 * 用户登录相关的 Mock 处理器
 * 包含登录、注册、登出、菜单获取、权限获取等接口
 */
export const userLoginHandlers = [
  http.post<UserLoginParams>(`${BASE_URL}/login`, async ({ request }) => {
    await delay(MOCK_DELAY.FAST)
    const body = (await request.json()) as UserLoginParams
    const userInfo = useUserList().find(
      (user: MockUserLoginList) =>
        user.username === body.username && user.password === body.password
    )
    if (userInfo) {
      return HttpResponse.json(
        {
          code: HttpStatusCode.OK,
          data: userInfo
        } as Service.Result<UserLoginResult>,
        { status: HttpStatusCode.OK }
      )
    }
    return HttpResponse.json(
      {
        code: HttpStatusCode.Unauthorized,
        message: formatMsg('用户名或密码错误')
      },
      { status: HttpStatusCode.OK }
    )
  }),

  http.post(`${BASE_URL}/signin`, async () => {
    await delay(MOCK_DELAY.FAST)
    return HttpResponse.json(
      {
        code: HttpStatusCode.Not_Found,
        message: formatMsg('注册功能暂未开放')
      },
      { status: HttpStatusCode.Not_Found }
    )
  }),

  http.post(`${BASE_URL}/logout`, async () => {
    await delay(MOCK_DELAY.FAST)
    return HttpResponse.json(
      {
        code: HttpStatusCode.OK,
        message: formatMsg('退出登录成功')
      },
      { status: HttpStatusCode.OK }
    )
  }),

  http.get(`${BASE_URL}/menu`, async ({ request }) => {
    await delay(MOCK_DELAY.FAST)
    const [error, user] = validateTokenAndGetUser(request)
    if (error) return error
    return HttpResponse.json(
      {
        code: HttpStatusCode.OK,
        data: user!.menus
      } as Service.Result<UserLoginMenu[]>,
      { status: HttpStatusCode.OK }
    )
  }),

  http.get(`${BASE_URL}/permissions`, async ({ request }) => {
    await delay(MOCK_DELAY.FAST)
    const [error, user] = validateTokenAndGetUser(request)
    if (error) return error
    return HttpResponse.json(
      {
        code: HttpStatusCode.OK,
        data: user!.permissions
      } as Service.Result<string[]>,
      { status: HttpStatusCode.OK }
    )
  })
]
