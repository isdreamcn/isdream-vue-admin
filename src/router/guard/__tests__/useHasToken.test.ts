const { mockUseUserStore, mockAppConfig } = vi.hoisted(() => ({
  mockUseUserStore: vi.fn(),
  mockAppConfig: { routeLoginName: '__ROUTE_LOGIN_NAME__' }
}))

vi.mock(import('@/store'), () => ({ useUserStore: mockUseUserStore }) as any)
vi.mock(import('@/config'), () => ({ appConfig: mockAppConfig }) as any)

import { useHasToken } from '../useHasToken'

function createMockRouter() {
  const beforeEachCallbacks: Array<(to: any, from: any) => any> = []
  return {
    beforeEach: vi.fn((cb) => {
      beforeEachCallbacks.push(cb)
    }),
    afterEach: vi.fn(),
    hasRoute: vi.fn().mockReturnValue(false),
    beforeEachCallbacks
  }
}

describe('useHasToken', () => {
  let mockRouter: ReturnType<typeof createMockRouter>

  beforeEach(() => {
    mockRouter = createMockRouter()
    mockUseUserStore.mockReturnValue({ token: '' })
  })

  it('needToken 为 false 时直接放行', () => {
    useHasToken(mockRouter as any)
    const result = mockRouter.beforeEachCallbacks[0](
      { meta: { needToken: false } },
      {} as any
    )

    expect(result).toBeUndefined()
  })

  it('needToken 为 true 且无 token，重定向到登录页', () => {
    mockUseUserStore.mockReturnValue({ token: '' })
    useHasToken(mockRouter as any)

    const result = mockRouter.beforeEachCallbacks[0](
      { meta: { needToken: true }, name: 'home' },
      {} as any
    )

    expect(result).toEqual({ name: '__ROUTE_LOGIN_NAME__' })
  })

  it('needToken 为 true 且无 token，已是登录页时放行', () => {
    mockUseUserStore.mockReturnValue({ token: '' })
    useHasToken(mockRouter as any)

    const result = mockRouter.beforeEachCallbacks[0](
      { meta: { needToken: true }, name: '__ROUTE_LOGIN_NAME__' },
      {} as any
    )

    expect(result).toBeUndefined()
  })

  it('needToken 为 true 且有 token 时放行', () => {
    mockUseUserStore.mockReturnValue({ token: 'valid-token' })
    useHasToken(mockRouter as any)

    const result = mockRouter.beforeEachCallbacks[0](
      { meta: { needToken: true }, name: 'home' },
      {} as any
    )

    expect(result).toBeUndefined()
  })

  it('token 为空字符串时视为无 token', () => {
    mockUseUserStore.mockReturnValue({ token: '' })
    useHasToken(mockRouter as any)

    const result = mockRouter.beforeEachCallbacks[0](
      { meta: { needToken: true }, name: 'dashboard' },
      {} as any
    )

    expect(result).toEqual({ name: '__ROUTE_LOGIN_NAME__' })
  })
})
