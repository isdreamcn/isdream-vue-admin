const { mockAddAlive, mockUseRouterStore } = vi.hoisted(() => ({
  mockAddAlive: vi.fn(),
  mockUseRouterStore: vi.fn()
}))

vi.mock(
  import('@/store'),
  () => ({ useRouterStore: mockUseRouterStore }) as any
)

import { useKeepAlive } from '../useKeepAlive'

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

describe('useKeepAlive', () => {
  let mockRouter: ReturnType<typeof createMockRouter>

  beforeEach(() => {
    mockRouter = createMockRouter()
    mockUseRouterStore.mockReturnValue({ addAlive: mockAddAlive })
  })

  it('hiddenInMenu 为 true 时跳过', () => {
    useKeepAlive(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({
      meta: { hiddenInMenu: true, keepAlive: true },
      matched: [{ path: '/a' }, { path: '/a/b' }]
    })

    expect(mockAddAlive).not.toHaveBeenCalled()
  })

  it('keepAlive 为 false 时跳过', () => {
    useKeepAlive(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({
      meta: { hiddenInMenu: false, keepAlive: false },
      matched: [{ path: '/a' }, { path: '/a/b' }]
    })

    expect(mockAddAlive).not.toHaveBeenCalled()
  })

  it('keepAlive 为 true 且有多层 matched 时建立映射', () => {
    useKeepAlive(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({
      meta: { hiddenInMenu: false, keepAlive: true },
      matched: [{ path: '/a' }, { path: '/a/b' }]
    })

    expect(mockAddAlive).toHaveBeenCalledWith('/a', '/a/b')
  })

  it('3 层 matched 时调用 2 次 addAlive', () => {
    useKeepAlive(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({
      meta: { hiddenInMenu: false, keepAlive: true },
      matched: [{ path: '/a' }, { path: '/a/b' }, { path: '/a/b/c' }]
    })

    expect(mockAddAlive).toHaveBeenCalledTimes(2)
    expect(mockAddAlive).toHaveBeenCalledWith('/a', '/a/b')
    expect(mockAddAlive).toHaveBeenCalledWith('/a/b', '/a/b/c')
  })

  it('matched 下一项 path 为空时不调用 addAlive', () => {
    useKeepAlive(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({
      meta: { hiddenInMenu: false, keepAlive: true },
      matched: [{ path: '/a' }, { path: '' }, { path: '/a/b/c' }]
    })

    // 第一次: key='/a', name='' → name 为空不调用
    // 第二次: key='', name='/a/b/c' → 调用
    expect(mockAddAlive).toHaveBeenCalledTimes(1)
    expect(mockAddAlive).toHaveBeenCalledWith('', '/a/b/c')
  })

  it('matched 长度为 1 时不调用 addAlive', () => {
    useKeepAlive(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({
      meta: { hiddenInMenu: false, keepAlive: true },
      matched: [{ path: '/a' }]
    })

    expect(mockAddAlive).not.toHaveBeenCalled()
  })
})
