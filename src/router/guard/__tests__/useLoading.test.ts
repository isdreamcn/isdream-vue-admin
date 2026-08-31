const { mockSetState, mockUseRouterStore, mockDebounce } = vi.hoisted(() => {
  let capturedFn: (() => void) | undefined
  return {
    mockSetState: vi.fn(),
    mockUseRouterStore: vi.fn(),
    mockDebounce: vi.fn((fn: () => void, _delay: number) => {
      capturedFn = fn
      return () => capturedFn!()
    })
  }
})

vi.mock(
  import('@/store'),
  () => ({ useRouterStore: mockUseRouterStore }) as any
)
vi.mock(import('@/utils'), () => ({ debounce: mockDebounce }) as any)

import { useLoading } from '../useLoading'

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

describe('useLoading', () => {
  let mockRouter: ReturnType<typeof createMockRouter>

  beforeEach(() => {
    mockRouter = createMockRouter()
    mockUseRouterStore.mockReturnValue({ setState: mockSetState })
  })

  it('afterEach 调用 setState 传入正确的状态', () => {
    useLoading(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({ meta: { needLoading: true } })

    expect(mockSetState).toHaveBeenCalledWith({
      needLoading: true,
      loading: false
    })
  })

  it('needLoading 为 true 时传入 needLoading: true', () => {
    useLoading(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({ meta: { needLoading: true } })

    expect(mockSetState).toHaveBeenCalledWith({
      needLoading: true,
      loading: false
    })
  })

  it('needLoading 为 false 时传入 needLoading: false', () => {
    useLoading(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({ meta: { needLoading: false } })

    expect(mockSetState).toHaveBeenCalledWith({
      needLoading: false,
      loading: false
    })
  })

  it('debounce 回调触发 setState({ needLoading: false })', () => {
    useLoading(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({ meta: { needLoading: true } })

    // mockDebounce 包装的函数会立即执行捕获的 fn
    // 所以 setState 应被调用两次：一次在 afterEach 中，一次在 debounce 回调中
    expect(mockSetState).toHaveBeenCalledWith({ needLoading: false })
  })

  it('debounce 被调用时传入 200ms 延迟', () => {
    useLoading(mockRouter as any)

    expect(mockDebounce).toHaveBeenCalledWith(expect.any(Function), 200)
  })
})
