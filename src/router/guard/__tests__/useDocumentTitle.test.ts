const { mockSetDocumentTitle } = vi.hoisted(() => ({
  mockSetDocumentTitle: vi.fn()
}))

vi.mock(
  import('@/utils'),
  () => ({ setDocumentTitle: mockSetDocumentTitle }) as any
)

import { useDocumentTitle } from '../useDocumentTitle'

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

describe('useDocumentTitle', () => {
  let mockRouter: ReturnType<typeof createMockRouter>

  beforeEach(() => {
    mockRouter = createMockRouter()
  })

  it('路由切换后调用 setDocumentTitle 传入 meta.title', () => {
    useDocumentTitle(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({ meta: { title: '首页' } })

    expect(mockSetDocumentTitle).toHaveBeenCalledWith('首页')
  })

  it('title 为 undefined 时仍调用 setDocumentTitle', () => {
    useDocumentTitle(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({ meta: {} })

    expect(mockSetDocumentTitle).toHaveBeenCalledWith(undefined)
  })

  it('多次路由切换每次都调用', () => {
    useDocumentTitle(mockRouter as any)

    mockRouter.afterEachCallbacks[0]({ meta: { title: '页面A' } })
    mockRouter.afterEachCallbacks[0]({ meta: { title: '页面B' } })

    expect(mockSetDocumentTitle).toHaveBeenCalledTimes(2)
    expect(mockSetDocumentTitle).toHaveBeenCalledWith('页面A')
    expect(mockSetDocumentTitle).toHaveBeenCalledWith('页面B')
  })
})
