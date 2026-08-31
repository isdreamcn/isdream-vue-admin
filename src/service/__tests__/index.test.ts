const { mockUseSetupToken, mockUseHandleError, mockUseLoading, mockConfig } =
  vi.hoisted(() => {
    const mockInterceptor = {
      requestInterceptor: vi.fn((c: any) => c),
      responseInterceptor: vi.fn((r: any) => r),
      responseInterceptorCatch: vi.fn((e: any) => Promise.reject(e))
    }
    return {
      mockUseSetupToken: vi.fn().mockReturnValue(mockInterceptor),
      mockUseHandleError: vi.fn().mockReturnValue(mockInterceptor),
      mockUseLoading: vi.fn().mockReturnValue(mockInterceptor),
      mockConfig: {
        baseUrlApi: '/testApi/',
        serviceTokenConfig: {
          position: 'headers' as const,
          key: 'Authorization',
          value: 'Bearer TOKEN',
          expires: 604800000
        }
      }
    }
  })

vi.mock(
  import('@/config'),
  () =>
    ({
      default: mockConfig,
      appConfig: mockConfig
    }) as any
)

vi.mock(
  import('../interceptors'),
  () =>
    ({
      useSetupToken: mockUseSetupToken,
      useHandleError: mockUseHandleError,
      useLoading: mockUseLoading
    }) as any
)

vi.mock(
  import('@/store'),
  () =>
    ({
      useUserStore: vi.fn(() => ({ token: '', logout: vi.fn() })),
      useRouterStore: vi.fn(() => ({
        loading: false,
        needLoading: true,
        setState: vi.fn()
      }))
    }) as any
)

vi.stubEnv('DEV', true)

import { service, mockService } from '../index'

// clearMocks: true 会在每个测试前自动清除 mock 调用记录，
// 所以必须在 describe 之前（模块加载后立即）保存调用信息
const interceptedCalls = {
  setupTokenCalls: mockUseSetupToken.mock.calls.slice(),
  loadingCalls: mockUseLoading.mock.calls.slice(),
  handleErrorCalls: mockUseHandleError.mock.calls.slice()
}

describe('service/index', () => {
  it('导出 service 实例', () => {
    expect(service).toBeDefined()
    expect(service.instance).toBeDefined()
    expect(service.request).toBeTypeOf('function')
    expect(service.requestNotHandle).toBeTypeOf('function')
  })

  it('导出 mockService 实例', () => {
    expect(mockService).toBeDefined()
    expect(mockService.instance).toBeDefined()
    expect(mockService.request).toBeTypeOf('function')
    expect(mockService.requestNotHandle).toBeTypeOf('function')
  })

  it('service 的 baseURL 在 DEV 模式下为 /proxyApi/', () => {
    expect(service.instance.defaults.baseURL).toBe('/proxyApi/')
  })

  it('mockService 的 baseURL 为 /mockApi/', () => {
    expect(mockService.instance.defaults.baseURL).toBe('/mockApi/')
  })

  it('导入时自动调用 useSetupToken、useLoading、useHandleError', () => {
    expect(interceptedCalls.setupTokenCalls.length).toBeGreaterThan(0)
    expect(interceptedCalls.loadingCalls.length).toBeGreaterThan(0)
    expect(interceptedCalls.handleErrorCalls.length).toBeGreaterThan(0)
  })

  it('useSetupToken 被调用时传入 config.serviceTokenConfig', () => {
    expect(interceptedCalls.setupTokenCalls.length).toBe(2)
    expect(interceptedCalls.setupTokenCalls[0][0]).toEqual(
      mockConfig.serviceTokenConfig
    )
    expect(interceptedCalls.setupTokenCalls[1][0]).toEqual(
      mockConfig.serviceTokenConfig
    )
  })

  it('useLoading 返回值被两个 service 共享', () => {
    expect(interceptedCalls.loadingCalls.length).toBe(1)
  })

  it('service 和 mockService 都注册了拦截器', () => {
    const serviceRequestInterceptors =
      service.instance.interceptors.request['handlers']!
    const serviceResponseInterceptors =
      service.instance.interceptors.response['handlers']!
    const mockRequestInterceptors =
      mockService.instance.interceptors.request['handlers']!
    const mockResponseInterceptors =
      mockService.instance.interceptors.response['handlers']!

    expect(serviceRequestInterceptors.length).toBeGreaterThan(0)
    expect(serviceResponseInterceptors.length).toBeGreaterThan(0)
    expect(mockRequestInterceptors.length).toBeGreaterThan(0)
    expect(mockResponseInterceptors.length).toBeGreaterThan(0)
  })
})
