const mockUseUserStore = vi.hoisted(() => vi.fn())

vi.mock(
  import('@/store'),
  () =>
    ({
      useUserStore: mockUseUserStore
    }) as any
)

beforeEach(() => {
  mockUseUserStore.mockReturnValue({ token: 'test-token-123' })
})

describe('useSetupToken', () => {
  async function load() {
    const { useSetupToken } = await import('../useSetupToken')
    return useSetupToken
  }

  function makeConfig(extra: Record<string, any> = {}) {
    return { ...extra } as any
  }

  it('position=headers 时将替换后的值写入 config.headers.Authorization', async () => {
    const useSetupToken = await load()
    const { requestInterceptor } = useSetupToken({
      position: 'headers',
      key: 'Authorization',
      value: 'Bearer TOKEN'
    })
    const config = makeConfig({ headers: {} })

    const result = requestInterceptor!(config) as any

    expect(result.headers.Authorization).toBe('Bearer test-token-123')
  })

  it('config.headers 不存在时自动创建空对象', async () => {
    const useSetupToken = await load()
    const { requestInterceptor } = useSetupToken({
      position: 'headers',
      key: 'Authorization',
      value: 'Bearer TOKEN'
    })
    const config = makeConfig()

    const result = requestInterceptor!(config) as any

    expect(result.headers).toEqual({ Authorization: 'Bearer test-token-123' })
  })

  it('value 中的 TOKEN 被替换为实际 token 值', async () => {
    const useSetupToken = await load()
    const { requestInterceptor } = useSetupToken({
      position: 'headers',
      key: 'Authorization',
      value: 'Bearer TOKEN'
    })
    const config = makeConfig({ headers: {} })

    const result = requestInterceptor!(config) as any

    expect(result.headers.Authorization).toBe('Bearer test-token-123')
  })

  it('position=params 时将值写入 config.params', async () => {
    const useSetupToken = await load()
    const { requestInterceptor } = useSetupToken({
      position: 'params',
      key: 'access_token',
      value: 'TOKEN'
    })
    const config = makeConfig()

    const result = requestInterceptor!(config) as any

    expect(result.params).toEqual({ access_token: 'test-token-123' })
  })

  it('position=data 时将值写入 config.data', async () => {
    const useSetupToken = await load()
    const { requestInterceptor } = useSetupToken({
      position: 'data',
      key: 'token',
      value: 'TOKEN'
    })
    const config = makeConfig()

    const result = requestInterceptor!(config) as any

    expect(result.data).toEqual({ token: 'test-token-123' })
  })

  it('无 token 时直接返回原 config，不做任何修改', async () => {
    const useSetupToken = await load()
    mockUseUserStore.mockReturnValue({ token: null })
    const { requestInterceptor } = useSetupToken({
      position: 'headers',
      key: 'Authorization',
      value: 'Bearer TOKEN'
    })
    const config = makeConfig()

    const result = requestInterceptor!(config) as any

    expect(result).toBe(config)
    expect(result.headers).toBeUndefined()
  })

  it('token 为空字符串时不修改 config', async () => {
    const useSetupToken = await load()
    mockUseUserStore.mockReturnValue({ token: '' })
    const { requestInterceptor } = useSetupToken({
      position: 'headers',
      key: 'Authorization',
      value: 'Bearer TOKEN'
    })
    const config = makeConfig()

    const result = requestInterceptor!(config) as any

    expect(result).toBe(config)
    expect(result.headers).toBeUndefined()
  })
})
