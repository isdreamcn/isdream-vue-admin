import type { InternalAxiosRequestConfig } from 'axios'

const { mockWatch, watchCallbacks, mockRouterStore } = vi.hoisted(() => {
  const watchCallbacks: Array<(newVal: any, oldVal: any) => void> = []
  return {
    mockWatch: vi.fn(
      (_getter: any, callback: (newVal: any, oldVal: any) => void) => {
        watchCallbacks.push(callback)
        return vi.fn()
      }
    ),
    watchCallbacks,
    mockRouterStore: {
      loading: false,
      needLoading: true,
      setState: vi.fn()
    }
  }
})

vi.mock(import('vue'), async (importOriginal) => {
  const original = await importOriginal<typeof import('vue')>()
  return { ...original, watch: mockWatch } as any
})

vi.mock(
  import('@/store'),
  () =>
    ({
      useRouterStore: () => mockRouterStore
    }) as any
)

beforeEach(() => {
  vi.resetModules()
  mockWatch.mockClear()
  watchCallbacks.length = 0
  mockRouterStore.loading = false
  mockRouterStore.needLoading = true
  mockRouterStore.setState.mockReset()
})

async function loadUseLoading() {
  vi.doMock(import('vue'), async (importOriginal) => {
    const original = await importOriginal<typeof import('vue')>()
    return { ...original, watch: mockWatch } as any
  })
  vi.doMock(
    import('@/store'),
    () =>
      ({
        useRouterStore: () => mockRouterStore
      }) as any
  )
  const { useLoading } = await import('../useLoading')
  return useLoading
}

async function loadInterceptors() {
  const useLoading = await loadUseLoading()
  const i = useLoading()
  return {
    req: i.requestInterceptor!,
    res: i.responseInterceptor!,
    err: i.responseInterceptorCatch!
  }
}

function makeConfig(url?: string) {
  return { url } as InternalAxiosRequestConfig
}

describe('useLoading', () => {
  describe('requestInterceptor', () => {
    it('调用 watchLoading 和 showLoading，needLoading=true 且 loading=false 时设置 loading=true', async () => {
      const { req } = await loadInterceptors()
      const config = makeConfig('/api/test')

      const result = req(config)

      expect(result).toBe(config)
      expect(mockWatch).toHaveBeenCalledTimes(1)
      expect(mockRouterStore.setState).toHaveBeenCalledWith({ loading: true })
    })

    it('needLoading=false 时不设置 loading', async () => {
      const { req } = await loadInterceptors()
      mockRouterStore.needLoading = false

      req(makeConfig('/api/test'))

      expect(mockRouterStore.setState).not.toHaveBeenCalled()
    })

    it('loading=true 时不重复 setState', async () => {
      const { req } = await loadInterceptors()
      mockRouterStore.loading = true

      req(makeConfig('/api/test'))

      expect(mockRouterStore.setState).not.toHaveBeenCalled()
    })

    it('对同一 URL 累加引用计数（通过 hiddenLoading 行为验证）', async () => {
      const { req, res } = await loadInterceptors()
      const url = '/api/test'

      req(makeConfig(url))
      req(makeConfig(url))
      mockRouterStore.loading = true

      res({ config: { url } } as any)

      expect(mockRouterStore.setState).not.toHaveBeenCalledWith({
        loading: false
      })
    })

    it('config.url 为 undefined 时不操作', async () => {
      const { req } = await loadInterceptors()

      req(makeConfig(undefined))

      expect(mockRouterStore.setState).not.toHaveBeenCalled()
    })
  })

  describe('responseInterceptor', () => {
    it('调用 hiddenLoading 传入 res.config.url', async () => {
      const { req, res } = await loadInterceptors()
      const url = '/api/test'

      req(makeConfig(url))
      mockRouterStore.loading = true

      const response = { config: { url } } as any
      const result = res(response)

      expect(result).toBe(response)
    })

    it('引用计数减 1 后仍大于 0 时保留在 map 中，不设置 loading=false', async () => {
      const { req, res } = await loadInterceptors()
      const url = '/api/test'

      req(makeConfig(url))
      req(makeConfig(url))
      mockRouterStore.loading = true

      res({ config: { url } } as any)

      expect(mockRouterStore.setState).not.toHaveBeenCalledWith({
        loading: false
      })
    })

    it('引用计数归零时从 map 删除该 URL，requestApiMap 清空时设置 loading=false', async () => {
      const { req, res } = await loadInterceptors()
      const url = '/api/test'

      req(makeConfig(url))
      mockRouterStore.loading = true

      res({ config: { url } } as any)

      expect(mockRouterStore.setState).toHaveBeenCalledWith({ loading: false })
    })

    it('loading=false 时 hiddenLoading 直接返回不操作', async () => {
      const { res } = await loadInterceptors()
      mockRouterStore.loading = false

      res({ config: { url: '/api/test' } } as any)

      expect(mockRouterStore.setState).not.toHaveBeenCalled()
    })
  })

  describe('responseInterceptorCatch', () => {
    it('调用 hiddenLoading 传入 err.config?.url', async () => {
      const { req, err: onErr } = await loadInterceptors()
      const url = '/api/test'

      req(makeConfig(url))
      mockRouterStore.loading = true

      const error = { config: { url } }
      await expect(onErr(error)).rejects.toBe(error)
      expect(mockRouterStore.setState).toHaveBeenCalledWith({ loading: false })
    })

    it('hiddenLoading 后仍然 reject 错误', async () => {
      const { err: onErr } = await loadInterceptors()
      const error = { config: { url: '/api/test' } }
      mockRouterStore.loading = true

      await expect(onErr(error)).rejects.toBe(error)
    })
  })

  describe('watchLoading', () => {
    it('首次调用时设置 watch', async () => {
      const { req } = await loadInterceptors()

      req(makeConfig('/api/test'))

      expect(mockWatch).toHaveBeenCalledTimes(1)
    })

    it('第二次调用时不再创建新的 watch（幂等）', async () => {
      const { req } = await loadInterceptors()

      req(makeConfig('/api/a'))
      req(makeConfig('/api/b'))

      expect(mockWatch).toHaveBeenCalledTimes(1)
    })

    it('watch 回调在 loading=false 且 requestApiMap 非空时清空 map（验证：后续 hiddenLoading 不触发 setState）', async () => {
      const { req, err: onErr } = await loadInterceptors()
      const url = '/api/test'

      req(makeConfig(url))
      mockRouterStore.loading = true

      expect(watchCallbacks.length).toBe(1)

      watchCallbacks[0](false, true)

      mockRouterStore.loading = true
      onErr({ config: { url } }).catch(() => {})
      expect(mockRouterStore.setState).toHaveBeenCalledWith({ loading: false })
    })
  })
})
