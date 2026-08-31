import { setupAppPlugins } from '../index'

const {
  mockUsePinia,
  mockUseVueRouter,
  mockUseDirectives,
  mockUseGlobalProperties,
  mockUseComponents,
  mockUseComponentsAll,
  mockUseViewer,
  mockUseDayjs
} = vi.hoisted(() => ({
  mockUsePinia: vi.fn(),
  mockUseVueRouter: vi.fn(),
  mockUseDirectives: vi.fn(),
  mockUseGlobalProperties: vi.fn(),
  mockUseComponents: vi.fn(),
  mockUseComponentsAll: vi.fn(),
  mockUseViewer: vi.fn(),
  mockUseDayjs: vi.fn()
}))

vi.mock(import('../pinia'), () => ({ usePinia: mockUsePinia }))
vi.mock(import('../vueRouter'), () => ({ useVueRouter: mockUseVueRouter }))
vi.mock(import('../directives'), () => ({ useDirectives: mockUseDirectives }))
vi.mock(import('../globalProperties'), () => ({
  useGlobalProperties: mockUseGlobalProperties
}))
vi.mock(import('../components'), () => ({
  useComponents: mockUseComponents,
  useComponentsAll: mockUseComponentsAll
}))
vi.mock(import('../viewer'), () => ({ useViewer: mockUseViewer }))
vi.mock(import('../dayjs'), () => ({ useDayjs: mockUseDayjs }))

const createMockApp = () => ({
  directive: vi.fn(),
  component: vi.fn(),
  use: vi.fn(),
  config: { globalProperties: {} as Record<string, any> }
})

describe('setupAppPlugins', () => {
  it('按顺序调用所有插件', () => {
    const order: string[] = []
    mockUsePinia.mockImplementation(() => order.push('pinia'))
    mockUseViewer.mockImplementation(() => order.push('viewer'))
    mockUseDayjs.mockImplementation(() => order.push('dayjs'))
    mockUseVueRouter.mockImplementation(() => order.push('router'))
    mockUseDirectives.mockImplementation(() => order.push('directives'))
    mockUseGlobalProperties.mockImplementation(() => order.push('properties'))
    mockUseComponents.mockImplementation(() => order.push('components'))

    vi.stubEnv('DEV', false)
    const app = createMockApp()
    setupAppPlugins(app as any)

    expect(order).toEqual([
      'pinia',
      'viewer',
      'dayjs',
      'router',
      'directives',
      'properties',
      'components'
    ])
  })

  it('传入 app 参数到每个 AppUsePlugin', () => {
    vi.stubEnv('DEV', false)
    const app = createMockApp()
    setupAppPlugins(app as any)

    expect(mockUsePinia).toHaveBeenCalledWith(app)
    expect(mockUseViewer).toHaveBeenCalledWith(app)
    expect(mockUseVueRouter).toHaveBeenCalledWith(app)
    expect(mockUseDirectives).toHaveBeenCalledWith(app)
    expect(mockUseGlobalProperties).toHaveBeenCalledWith(app)
    expect(mockUseComponents).toHaveBeenCalledWith(app)
  })

  it('DEV 模式调用 useComponentsAll', () => {
    vi.stubEnv('DEV', true)
    const app = createMockApp()
    setupAppPlugins(app as any)

    expect(mockUseComponentsAll).toHaveBeenCalledWith(app)
    expect(mockUseComponents).not.toHaveBeenCalled()
  })

  it('PROD 模式调用 useComponents', () => {
    vi.stubEnv('DEV', false)
    const app = createMockApp()
    setupAppPlugins(app as any)

    expect(mockUseComponents).toHaveBeenCalledWith(app)
    expect(mockUseComponentsAll).not.toHaveBeenCalled()
  })

  it('useDayjs 不接收 app 参数', () => {
    vi.stubEnv('DEV', false)
    const app = createMockApp()
    setupAppPlugins(app as any)

    expect(mockUseDayjs).toHaveBeenCalledWith()
  })
})
