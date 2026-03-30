import { http, HttpResponse, delay } from 'msw'
import { HttpStatusCode } from '@/constants'
import {
  useUserList,
  formatUrl,
  formatMsg,
  extractToken,
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
    await delay(100)
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
    await delay(100)
    return HttpResponse.json(
      {
        code: HttpStatusCode.Not_Found,
        message: formatMsg('注册功能暂未开放')
      },
      { status: HttpStatusCode.Not_Found }
    )
  }),

  http.post(`${BASE_URL}/logout`, async () => {
    await delay(100)
    return HttpResponse.json(
      {
        code: HttpStatusCode.OK,
        message: formatMsg('退出登录成功')
      },
      { status: HttpStatusCode.OK }
    )
  }),

  http.get(`${BASE_URL}/menu`, async ({ request }) => {
    await delay(100)
    const authorization = request.headers.get('authorization')
    const token = extractToken(authorization)
    if (!token) {
      return HttpResponse.json(
        {
          code: HttpStatusCode.Unauthorized,
          message: formatMsg('headers中不存在token')
        },
        { status: HttpStatusCode.OK }
      )
    }
    const userInfo = useUserList().find(
      (item: MockUserLoginList) => item.token === token
    )
    if (!userInfo) {
      return HttpResponse.json(
        {
          code: HttpStatusCode.Unauthorized,
          message: formatMsg(`token:${token}校验失败`)
        },
        { status: HttpStatusCode.OK }
      )
    }
    return HttpResponse.json(
      {
        code: HttpStatusCode.OK,
        data: userInfo.menus
      } as Service.Result<UserLoginMenu[]>,
      { status: HttpStatusCode.OK }
    )
  }),

  http.get(`${BASE_URL}/permissions`, async ({ request }) => {
    await delay(100)
    const authorization = request.headers.get('authorization')
    const token = extractToken(authorization)
    if (!token) {
      return HttpResponse.json(
        {
          code: HttpStatusCode.Unauthorized,
          message: formatMsg('headers中不存在token')
        },
        { status: HttpStatusCode.OK }
      )
    }
    const userInfo = useUserList().find(
      (item: MockUserLoginList) => item.token === token
    )
    if (!userInfo) {
      return HttpResponse.json(
        {
          code: HttpStatusCode.Unauthorized,
          message: formatMsg(`token:${token}校验失败`)
        },
        { status: HttpStatusCode.OK }
      )
    }
    return HttpResponse.json(
      {
        code: HttpStatusCode.OK,
        data: userInfo.permissions
      } as Service.Result<string[]>,
      { status: HttpStatusCode.OK }
    )
  })
]
