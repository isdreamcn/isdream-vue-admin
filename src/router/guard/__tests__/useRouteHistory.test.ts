const { mockAddRouteHistory, mockUseRouterStore } = vi.hoisted(() => ({
  mockAddRouteHistory: vi.fn(),
  mockUseRouterStore: vi.fn()
}))

vi.mock(
  import('@/store'),
  () => ({ useRouterStore: mockUseRouterStore }) as any
)

import { useRouteHistory } from '../useRouteHistory'

function createMockRouter() {
  const afterEachCallbacks: Array<(to: any) => void> = []
  return {
    beforeEach: vi.fn(),
    afterEach: vi.fn((cb) => {
      afterEachCallbacks.push(cb)
    }),
    hasRoute: vi.fn().mockReturnValue(false),
    afterEachCallbacks
  }
}

describe('useRouteHistory', () => {
  let mockRouter: ReturnType<typeof createMockRouter>

  beforeEach(() => {
    mockRouter = createMockRouter()
    mockUseRouterStore.mockReturnValue({ addRouteHistory: mockAddRouteHistory })
  })

  it('needRouteHistory 为 false 时跳过', () => {
    useRouteHistory(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({
      meta: { needRouteHistory: false },
      fullPath: '/test'
    })

    expect(mockAddRouteHistory).not.toHaveBeenCalled()
  })

  it('needRouteHistory 为 true 时调用 addRouteHistory', () => {
    useRouteHistory(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({
      meta: { needRouteHistory: true, title: '测试页' },
      fullPath: '/test'
    })

    expect(mockAddRouteHistory).toHaveBeenCalledTimes(1)
  })

  it('传入 path 为 to.fullPath', () => {
    useRouteHistory(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({
      meta: { needRouteHistory: true, title: '测试页' },
      fullPath: '/test?q=1'
    })

    expect(mockAddRouteHistory).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/test?q=1' })
    )
  })

  it('title 为空时回退使用 fullPath', () => {
    useRouteHistory(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({
      meta: { needRouteHistory: true },
      fullPath: '/dashboard'
    })

    expect(mockAddRouteHistory).toHaveBeenCalledWith(
      expect.objectContaining({
        meta: expect.objectContaining({ title: '/dashboard' })
      })
    )
  })
})
