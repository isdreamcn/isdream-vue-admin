const {
  mockUseRedirect,
  mockUseLoading,
  mockUseHasToken,
  mockUseKeepAlive,
  mockUseRouteHistory,
  mockUseDocumentTitle
} = vi.hoisted(() => ({
  mockUseRedirect: vi.fn(),
  mockUseLoading: vi.fn(),
  mockUseHasToken: vi.fn(),
  mockUseKeepAlive: vi.fn(),
  mockUseRouteHistory: vi.fn(),
  mockUseDocumentTitle: vi.fn()
}))

vi.mock(
  import('../useRedirect'),
  () => ({ useRedirect: mockUseRedirect }) as any
)
vi.mock(import('../useLoading'), () => ({ useLoading: mockUseLoading }) as any)
vi.mock(
  import('../useHasToken'),
  () => ({ useHasToken: mockUseHasToken }) as any
)
vi.mock(
  import('../useKeepAlive'),
  () => ({ useKeepAlive: mockUseKeepAlive }) as any
)
vi.mock(
  import('../useRouteHistory'),
  () => ({ useRouteHistory: mockUseRouteHistory }) as any
)
vi.mock(
  import('../useDocumentTitle'),
  () => ({ useDocumentTitle: mockUseDocumentTitle }) as any
)

import { useRouterGuard } from '../index'

describe('useRouterGuard', () => {
  const mockRouter = {
    beforeEach: vi.fn(),
    afterEach: vi.fn(),
    hasRoute: vi.fn(),
    addRoute: vi.fn()
  } as any

  it('调用所有 6 个 guard 函数', () => {
    useRouterGuard(mockRouter)

    expect(mockUseRedirect).toHaveBeenCalledWith(mockRouter)
    expect(mockUseLoading).toHaveBeenCalledWith(mockRouter)
    expect(mockUseHasToken).toHaveBeenCalledWith(mockRouter)
    expect(mockUseKeepAlive).toHaveBeenCalledWith(mockRouter)
    expect(mockUseRouteHistory).toHaveBeenCalledWith(mockRouter)
    expect(mockUseDocumentTitle).toHaveBeenCalledWith(mockRouter)
  })

  it('所有 guard 接收同一个 router 实例', () => {
    useRouterGuard(mockRouter)

    const calls = [
      mockUseRedirect,
      mockUseLoading,
      mockUseHasToken,
      mockUseKeepAlive,
      mockUseRouteHistory,
      mockUseDocumentTitle
    ]

    calls.forEach((fn) => {
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith(mockRouter)
    })
  })
})
