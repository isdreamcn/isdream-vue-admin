import { HttpStatusCode } from '@/constants'
import { useHandleError } from '../useHandleError'

type TestConfig = { _silentError?: boolean }

const { mockElMessageError, mockLogout, mockUseUserStore } = vi.hoisted(() => ({
  mockElMessageError: vi.fn(),
  mockLogout: vi.fn(),
  mockUseUserStore: vi.fn()
}))

vi.mock(
  import('element-plus'),
  () =>
    ({
      ElMessage: { error: mockElMessageError }
    }) as any
)

vi.mock(
  import('@/store'),
  () =>
    ({
      useUserStore: mockUseUserStore
    }) as any
)

beforeEach(() => {
  mockUseUserStore.mockReturnValue({ logout: mockLogout })
})

describe('useHandleError', () => {
  const interceptors = useHandleError()
  const onResponse = interceptors.responseInterceptor!
  const onReject = interceptors.responseInterceptorCatch!

  const createResponse = (
    data: { code?: number; message?: string },
    config: TestConfig = {}
  ) => ({ data, config }) as any

  describe('responseInterceptor', () => {
    it('code=400 时调用 ElMessage.error 并 reject', async () => {
      const res = createResponse({ code: HttpStatusCode.Bad_Request })
      await expect(onResponse(res)).rejects.toEqual({
        code: HttpStatusCode.Bad_Request,
        message: undefined,
        response: res
      })
      expect(mockElMessageError).toHaveBeenCalledWith('请求参数错误')
    })

    it('code=401 时调用 logout 且不显示消息', async () => {
      const res = createResponse({ code: HttpStatusCode.Unauthorized })
      await expect(onResponse(res)).rejects.toEqual({
        code: HttpStatusCode.Unauthorized,
        message: undefined,
        response: res
      })
      expect(mockLogout).toHaveBeenCalled()
      expect(mockElMessageError).not.toHaveBeenCalled()
    })

    it('response 自带 message 时优先使用', async () => {
      const res = createResponse({
        code: HttpStatusCode.Bad_Request,
        message: '自定义错误'
      })
      await expect(onResponse(res)).rejects.toEqual({
        code: HttpStatusCode.Bad_Request,
        message: '自定义错误',
        response: res
      })
      expect(mockElMessageError).toHaveBeenCalledWith('自定义错误')
    })

    it('code 不在 failCodeMap 中时直接返回 response', () => {
      const res = createResponse({ code: 200, message: 'ok' })
      expect(onResponse(res)).toBe(res)
    })

    it('_silentError=true 时不显示消息但仍然 reject', async () => {
      const res = createResponse(
        { code: HttpStatusCode.Bad_Request },
        { _silentError: true }
      )
      await expect(onResponse(res)).rejects.toEqual({
        code: HttpStatusCode.Bad_Request,
        message: undefined,
        response: res
      })
      expect(mockElMessageError).not.toHaveBeenCalled()
    })

    it('_silentError=true 时仍执行 handler（如 401 logout）', async () => {
      const res = createResponse(
        { code: HttpStatusCode.Unauthorized },
        { _silentError: true }
      )
      await expect(onResponse(res)).rejects.toBeDefined()
      expect(mockLogout).toHaveBeenCalled()
      expect(mockElMessageError).not.toHaveBeenCalled()
    })

    it('code=403 时使用默认 message', async () => {
      const res = createResponse({ code: HttpStatusCode.Forbidden })
      await expect(onResponse(res)).rejects.toBeDefined()
      expect(mockElMessageError).toHaveBeenCalledWith('访问被拒绝')
    })

    it('code=404 时使用默认 message', async () => {
      const res = createResponse({ code: HttpStatusCode.Not_Found })
      await expect(onResponse(res)).rejects.toBeDefined()
      expect(mockElMessageError).toHaveBeenCalledWith('请求的资源不存在')
    })

    it('code=500 时使用默认 message', async () => {
      const res = createResponse({ code: HttpStatusCode.Internal_Server_Error })
      await expect(onResponse(res)).rejects.toBeDefined()
      expect(mockElMessageError).toHaveBeenCalledWith('服务器内部错误')
    })

    it('reject 的值包含 { code, message, response }', async () => {
      const res = createResponse({
        code: HttpStatusCode.Bad_Request,
        message: 'err'
      })
      await expect(onResponse(res)).rejects.toEqual({
        code: HttpStatusCode.Bad_Request,
        message: 'err',
        response: res
      })
    })
  })

  describe('responseInterceptorCatch — 无 response', () => {
    const createNetworkError = (overrides: Record<string, any> = {}) =>
      ({ config: {}, ...overrides }) as any

    it('err.code=ECONNABORTED 时显示请求超时消息', async () => {
      const err = createNetworkError({
        code: 'ECONNABORTED',
        message: 'timeout'
      })
      await expect(onReject(err)).rejects.toEqual({
        message: '请求超时，请稍后重试'
      })
      expect(mockElMessageError).toHaveBeenCalledWith('请求超时，请稍后重试')
    })

    it('err.message 包含 Network Error 时显示网络连接失败消息', async () => {
      const err = createNetworkError({ message: 'Network Error' })
      await expect(onReject(err)).rejects.toEqual({
        message: '网络连接失败，请检查网络设置'
      })
      expect(mockElMessageError).toHaveBeenCalledWith(
        '网络连接失败，请检查网络设置'
      )
    })

    it('其他错误显示 "请求失败: {err.message}"', async () => {
      const err = createNetworkError({ message: 'some error' })
      await expect(onReject(err)).rejects.toEqual({
        message: '请求失败: some error'
      })
      expect(mockElMessageError).toHaveBeenCalledWith('请求失败: some error')
    })

    it('无 message 时显示 "请求失败: 未知错误"', async () => {
      const err = createNetworkError({ message: undefined })
      await expect(onReject(err)).rejects.toEqual({
        message: '请求失败: 未知错误'
      })
      expect(mockElMessageError).toHaveBeenCalledWith('请求失败: 未知错误')
    })

    it('_silentError=true 时不显示错误消息', async () => {
      const err = {
        code: 'ECONNABORTED',
        message: 'timeout',
        config: { _silentError: true }
      } as any
      await expect(onReject(err)).rejects.toBeDefined()
      expect(mockElMessageError).not.toHaveBeenCalled()
    })

    it('reject 的值包含 message', async () => {
      const err = createNetworkError({
        code: 'ECONNABORTED',
        message: 'timeout'
      })
      await expect(onReject(err)).rejects.toEqual({
        message: '请求超时，请稍后重试'
      })
    })
  })

  describe('responseInterceptorCatch — 有 response', () => {
    const createResponseError = (
      status: number,
      data: Record<string, any> = {},
      config: TestConfig = {}
    ) =>
      ({
        config,
        response: { status, data }
      }) as any

    it('response.data.code 在 failCodeMap 中时调用 handleError', async () => {
      const err = createResponseError(200, { code: HttpStatusCode.Bad_Request })
      await expect(onReject(err)).rejects.toEqual({
        code: HttpStatusCode.Bad_Request,
        message: undefined,
        response: err.response
      })
      expect(mockElMessageError).toHaveBeenCalledWith('请求参数错误')
    })

    it('code 与 status 不同时用 status 匹配 failCodeMap', async () => {
      const err = createResponseError(HttpStatusCode.Not_Found, { code: 999 })
      await expect(onReject(err)).rejects.toEqual({
        code: HttpStatusCode.Not_Found,
        message: undefined,
        response: err.response
      })
      expect(mockElMessageError).toHaveBeenCalledWith('请求的资源不存在')
    })

    it('无匹配 failCodeMap 且有 message 时显示 ElMessage.error(message)', async () => {
      const err = createResponseError(418, {
        code: 999,
        message: '未知业务错误'
      })
      await expect(onReject(err)).rejects.toEqual({
        code: 999,
        message: '未知业务错误',
        response: err.response
      })
      expect(mockElMessageError).toHaveBeenCalledWith('未知业务错误')
    })

    it('reject 的值包含 { code, message, response }', async () => {
      const err = createResponseError(HttpStatusCode.Bad_Request, {
        code: HttpStatusCode.Bad_Request,
        message: 'err'
      })
      await expect(onReject(err)).rejects.toEqual({
        code: HttpStatusCode.Bad_Request,
        message: 'err',
        response: err.response
      })
    })
  })
})
