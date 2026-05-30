import { useDirectives } from '../directives'
import { useGlobalProperties } from '../globalProperties'
import { useVueRouter } from '../vueRouter'
import { useViewer } from '../viewer'
import { usePinia } from '../pinia'

const {
  mockDateFormat,
  mockAuth,
  mockRouter,
  mockVueViewer,
  mockCreatePinia,
  mockSetupStore,
  mockEchartsUse
} = vi.hoisted(() => ({
  mockDateFormat: vi.fn(),
  mockAuth: vi.fn(),
  mockRouter: {},
  mockVueViewer: { install: vi.fn() },
  mockCreatePinia: vi.fn(() => ({ _p: 'pinia' })),
  mockSetupStore: vi.fn(),
  mockEchartsUse: vi.fn()
}))

vi.mock(
  import('@/directives'),
  () =>
    ({
      dateFormat: mockDateFormat,
      auth: mockAuth
    }) as any
)
vi.mock(
  import('@/router'),
  () =>
    ({
      default: mockRouter
    }) as any
)
vi.mock(
  import('v-viewer'),
  () =>
    ({
      default: mockVueViewer
    }) as any
)
vi.mock(
  import('pinia'),
  () =>
    ({
      createPinia: mockCreatePinia
    }) as any
)
vi.mock(import('@/store'), () => ({
  setupStore: mockSetupStore
}))
vi.mock(import('@/utils'), () => ({
  dateFormat: vi.fn(),
  getVal: vi.fn(),
  checkAuth: vi.fn()
}))
vi.mock(import('echarts/core'), () => ({
  use: mockEchartsUse
}))
vi.mock(
  import('echarts/charts'),
  () =>
    ({
      BarChart: 'BarChart',
      LineChart: 'LineChart'
    }) as any
)
vi.mock(
  import('echarts/components'),
  () =>
    ({
      TitleComponent: 'TitleComponent',
      TooltipComponent: 'TooltipComponent',
      GridComponent: 'GridComponent',
      DatasetComponent: 'DatasetComponent',
      TransformComponent: 'TransformComponent'
    }) as any
)
vi.mock(
  import('echarts/features'),
  () =>
    ({
      LabelLayout: 'LabelLayout',
      UniversalTransition: 'UniversalTransition'
    }) as any
)
vi.mock(
  import('echarts/renderers'),
  () =>
    ({
      SVGRenderer: 'SVGRenderer'
    }) as any
)

const createMockApp = () => ({
  directive: vi.fn(),
  component: vi.fn(),
  use: vi.fn(),
  config: { globalProperties: {} as Record<string, any> }
})

describe('useDirectives', () => {
  it('注册 dateFormat 指令', () => {
    const app = createMockApp()
    useDirectives(app as any)
    expect(app.directive).toHaveBeenCalledWith('dateFormat', mockDateFormat)
  })

  it('注册 auth 指令', () => {
    const app = createMockApp()
    useDirectives(app as any)
    expect(app.directive).toHaveBeenCalledWith('auth', mockAuth)
  })

  it('共调用 app.directive 两次', () => {
    const app = createMockApp()
    useDirectives(app as any)
    expect(app.directive).toHaveBeenCalledTimes(2)
  })
})

describe('useGlobalProperties', () => {
  it('注册全局属性带 $ 前缀', () => {
    const app = createMockApp()
    useGlobalProperties(app as any)
    const gp = app.config.globalProperties
    expect(gp.$dateFormat).toBeDefined()
    expect(gp.$getVal).toBeDefined()
    expect(gp.$checkAuth).toBeDefined()
  })

  it('注册三个属性', () => {
    const app = createMockApp()
    useGlobalProperties(app as any)
    expect(Object.keys(app.config.globalProperties)).toHaveLength(3)
  })

  it('重复注册时输出 console.warn 并跳过', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const app = createMockApp()
    const original = Symbol('original')
    app.config.globalProperties.$dateFormat = original

    useGlobalProperties(app as any)

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('$dateFormat'))
    expect(app.config.globalProperties.$dateFormat).toBe(original)
  })
})

describe('useVueRouter', () => {
  it('调用 app.use 注册 router', () => {
    const app = createMockApp()
    useVueRouter(app as any)
    expect(app.use).toHaveBeenCalledWith(mockRouter)
  })
})

describe('useViewer', () => {
  it('调用 app.use 注册 v-viewer 并传入 zIndex 配置', () => {
    const app = createMockApp()
    useViewer(app as any)
    expect(app.use).toHaveBeenCalledWith(mockVueViewer, {
      defaultOptions: { zIndex: 9801 }
    })
  })
})

describe('usePinia', () => {
  it('创建 pinia 实例', () => {
    const app = createMockApp()
    usePinia(app as any)
    expect(mockCreatePinia).toHaveBeenCalled()
  })

  it('调用 app.use 注册 pinia', () => {
    const app = createMockApp()
    usePinia(app as any)
    expect(app.use).toHaveBeenCalledWith({ _p: 'pinia' })
  })

  it('调用 setupStore', () => {
    const app = createMockApp()
    usePinia(app as any)
    expect(mockSetupStore).toHaveBeenCalled()
  })
})

describe('useDayjs', () => {
  it('设置 dayjs locale 为 zh-cn', async () => {
    const { useDayjs } = await import('../dayjs')
    useDayjs()
    const dayjs = (await import('dayjs')).default
    expect(dayjs.locale()).toBe('zh-cn')
  })
})

describe('useECharts', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('首次调用注册 echarts 组件', async () => {
    const { useECharts } = await import('../echarts')
    useECharts()
    expect(mockEchartsUse).toHaveBeenCalledTimes(1)
    const args = mockEchartsUse.mock.calls[0][0]
    expect(args).toHaveLength(10)
  })

  it('幂等：重复调用不再注册', async () => {
    const { useECharts } = await import('../echarts')
    useECharts()
    useECharts()
    expect(mockEchartsUse).toHaveBeenCalledTimes(1)
  })
})
