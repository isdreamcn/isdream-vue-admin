const {
  mockRoutesHandler,
  mockUseRouteMainPath,
  mockAppConfig,
  mockIsFunction
} = vi.hoisted(() => ({
  mockRoutesHandler: { getRouteByPath: vi.fn() },
  mockUseRouteMainPath: vi.fn(),
  mockAppConfig: { routeMainName: '__ROUTE_MAIN_NAME__' },
  mockIsFunction: vi.fn()
}))

vi.mock(import('@/router'), () => ({ routesHandler: mockRoutesHandler }) as any)
vi.mock(
  import('@/store'),
  () => ({ useRouteMainPath: mockUseRouteMainPath }) as any
)
vi.mock(import('@/config'), () => ({ appConfig: mockAppConfig }) as any)
vi.mock(import('@/utils'), () => ({ isFunction: mockIsFunction }) as any)

import { useRedirect } from '../useRedirect'

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

function createMockRoute(overrides: Record<string, any> = {}) {
  return {
    fullPath: '/test',
    path: '/test',
    name: 'test',
    meta: {},
    matched: [{ path: '/test' }],
    ...overrides
  }
}

describe('useRedirect', () => {
  let mockRouter: ReturnType<typeof createMockRouter>

  beforeEach(() => {
    mockRouter = createMockRouter()
    mockUseRouteMainPath.mockReturnValue({ value: '/home' })
    mockRoutesHandler.getRouteByPath.mockReturnValue(undefined)
    mockIsFunction.mockReturnValue(false)
  })

  describe('同路径参数刷新', () => {
    it('hasRoute("refresh") 为 false 时不触发', () => {
      mockRouter.hasRoute.mockReturnValue(false)
      useRedirect(mockRouter as any)

      const to = createMockRoute({
        fullPath: '/test?q=2',
        matched: [{ path: '/test' }]
      })
      const from = createMockRoute({
        fullPath: '/test?q=1',
        matched: [{ path: '/test' }]
      })
      const result = mockRouter.beforeEachCallbacks[0](to, from)

      expect(result).toBeUndefined()
    })

    it('fullPath 相同时不触发', () => {
      mockRouter.hasRoute.mockReturnValue(true)
      useRedirect(mockRouter as any)

      const to = createMockRoute({ fullPath: '/test?q=1' })
      const from = createMockRoute({ fullPath: '/test?q=1' })
      const result = mockRouter.beforeEachCallbacks[0](to, from)

      expect(result).toBeUndefined()
    })

    it('fullPath 不同且 getRoutePath 相同时重定向到 refresh', () => {
      mockRouter.hasRoute.mockReturnValue(true)
      useRedirect(mockRouter as any)

      const to = createMockRoute({
        fullPath: '/test?page=2',
        matched: [{ path: '/other' }, { path: '/test' }]
      })
      const from = createMockRoute({
        fullPath: '/test?page=1',
        matched: [{ path: '/other' }, { path: '/test' }]
      })
      const result = mockRouter.beforeEachCallbacks[0](to, from)

      expect(result).toEqual({
        name: 'refresh',
        query: { fullPath: '/test?page=2' }
      })
    })

    it('fullPath 不同但 getRoutePath 也不同时不触发', () => {
      mockRouter.hasRoute.mockReturnValue(true)
      useRedirect(mockRouter as any)

      const to = createMockRoute({
        fullPath: '/other',
        matched: [{ path: '/other' }]
      })
      const from = createMockRoute({
        fullPath: '/test',
        matched: [{ path: '/test' }]
      })
      const result = mockRouter.beforeEachCallbacks[0](to, from)

      expect(result).toBeUndefined()
    })

    it('matched 为空数组时视为同路径，触发刷新', () => {
      mockRouter.hasRoute.mockReturnValue(true)
      useRedirect(mockRouter as any)

      const to = createMockRoute({ fullPath: '/test?page=2', matched: [] })
      const from = createMockRoute({ fullPath: '/test?page=1', matched: [] })
      const result = mockRouter.beforeEachCallbacks[0](to, from)

      // getRoutePath 对空数组返回 undefined，undefined === undefined 为 true
      // 但 fullPath 不同，所以会触发刷新
      expect(result).toEqual({
        name: 'refresh',
        query: { fullPath: '/test?page=2' }
      })
    })
  })

  describe('返回首页', () => {
    it('to.name 等于 routeMainName 时返回 useRouteMainPath().value', () => {
      mockRouter.hasRoute.mockReturnValue(false)
      mockUseRouteMainPath.mockReturnValue({ value: '/dashboard' })
      useRedirect(mockRouter as any)

      const to = createMockRoute({ name: '__ROUTE_MAIN_NAME__' })
      const result = mockRouter.beforeEachCallbacks[0](to, createMockRoute())

      expect(result).toBe('/dashboard')
    })

    it('to.name 不等于 routeMainName 时不触发', () => {
      mockRouter.hasRoute.mockReturnValue(false)
      useRedirect(mockRouter as any)

      const to = createMockRoute({ name: 'other' })
      const result = mockRouter.beforeEachCallbacks[0](to, createMockRoute())

      // 会继续走后面的分支逻辑
      expect(result).toBeUndefined()
    })
  })

  describe('路由 redirect', () => {
    it('redirect 为函数时调用 redirect(to, from) 并返回结果', () => {
      const redirectFn = vi.fn().mockReturnValue('/custom-redirect')
      mockIsFunction.mockReturnValue(true)
      mockRoutesHandler.getRouteByPath.mockReturnValue({
        route: { redirect: redirectFn }
      })
      useRedirect(mockRouter as any)

      const to = createMockRoute({ name: 'test' })
      const from = createMockRoute()
      const result = mockRouter.beforeEachCallbacks[0](to, from)

      expect(redirectFn).toHaveBeenCalledWith(to, from)
      expect(result).toBe('/custom-redirect')
    })

    it('redirect 为字符串时直接返回', () => {
      mockIsFunction.mockReturnValue(false)
      mockRoutesHandler.getRouteByPath.mockReturnValue({
        route: { redirect: '/redirected' }
      })
      useRedirect(mockRouter as any)

      const to = createMockRoute({ name: 'test' })
      const result = mockRouter.beforeEachCallbacks[0](to, createMockRoute())

      expect(result).toBe('/redirected')
    })

    it('getRouteByPath 返回 undefined 时不触发 redirect 分支', () => {
      mockRoutesHandler.getRouteByPath.mockReturnValue(undefined)
      useRedirect(mockRouter as any)

      const to = createMockRoute({ name: 'test' })
      const result = mockRouter.beforeEachCallbacks[0](to, createMockRoute())

      expect(result).toBeUndefined()
    })

    it('route 存在但 redirect 为 undefined 时不触发', () => {
      mockRoutesHandler.getRouteByPath.mockReturnValue({
        route: { redirect: undefined }
      })
      useRedirect(mockRouter as any)

      const to = createMockRoute({ name: 'test' })
      const result = mockRouter.beforeEachCallbacks[0](to, createMockRoute())

      expect(result).toBeUndefined()
    })
  })

  describe('叶子节点重定向', () => {
    it('redirectNode.route.path 存在时返回该路径', () => {
      mockRoutesHandler.getRouteByPath.mockReturnValue({
        route: {},
        redirectNode: { route: { path: '/leaf' } }
      })
      useRedirect(mockRouter as any)

      const to = createMockRoute({ name: 'test' })
      const result = mockRouter.beforeEachCallbacks[0](to, createMockRoute())

      expect(result).toBe('/leaf')
    })

    it('redirectNode 不存在时不触发', () => {
      mockRoutesHandler.getRouteByPath.mockReturnValue({
        route: {}
      })
      useRedirect(mockRouter as any)

      const to = createMockRoute({ name: 'test' })
      const result = mockRouter.beforeEachCallbacks[0](to, createMockRoute())

      expect(result).toBeUndefined()
    })

    it('redirectNode.route.path 为空字符串时不触发', () => {
      mockRoutesHandler.getRouteByPath.mockReturnValue({
        route: {},
        redirectNode: { route: { path: '' } }
      })
      useRedirect(mockRouter as any)

      const to = createMockRoute({ name: 'test' })
      const result = mockRouter.beforeEachCallbacks[0](to, createMockRoute())

      expect(result).toBeUndefined()
    })
  })

  describe('优先级', () => {
    it('分支 1 优先于分支 2（满足刷新条件时直接返回）', () => {
      mockRouter.hasRoute.mockReturnValue(true)
      useRedirect(mockRouter as any)

      const to = createMockRoute({
        name: '__ROUTE_MAIN_NAME__',
        fullPath: '/main?page=2',
        matched: [{ path: '/main' }]
      })
      const from = createMockRoute({
        fullPath: '/main?page=1',
        matched: [{ path: '/main' }]
      })
      const result = mockRouter.beforeEachCallbacks[0](to, from)

      // 刷新分支优先于首页分支
      expect(result).toEqual({
        name: 'refresh',
        query: { fullPath: '/main?page=2' }
      })
    })

    it('分支 2 优先于分支 3（满足首页条件时不检查 redirect）', () => {
      mockUseRouteMainPath.mockReturnValue({ value: '/home' })
      useRedirect(mockRouter as any)

      const to = createMockRoute({ name: '__ROUTE_MAIN_NAME__' })
      const from = createMockRoute()
      const result = mockRouter.beforeEachCallbacks[0](to, from)

      expect(result).toBe('/home')
      expect(mockRoutesHandler.getRouteByPath).not.toHaveBeenCalled()
    })
  })
})
