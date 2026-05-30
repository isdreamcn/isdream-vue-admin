import { useComponents, useComponentsAll } from '../components'

vi.mock(
  import('../components/components'),
  () =>
    ({
      MForm: { name: 'MForm', install: vi.fn() },
      MIcon: { name: 'MIcon' },
      ElInput: { name: 'ElInput' },
      ElDatePicker: { name: 'ElDatePicker' },
      MUpload: { name: 'MUpload', install: vi.fn() },
      MTreeSelect: { name: 'MTreeSelect' },
      MEditor: { name: 'MEditor' }
    }) as any
)

vi.mock(
  import('../components/icons'),
  () =>
    ({
      Edit: { name: 'Edit' },
      Delete: {}
    }) as any
)

vi.mock(
  import('element-plus'),
  () =>
    ({
      default: { install: vi.fn() }
    }) as any
)

vi.mock(
  import('@/components'),
  () =>
    ({
      MComp1: { install: vi.fn() },
      MComp2: { name: 'NoInstallComp' }
    }) as any
)

const createMockApp = () => ({
  component: vi.fn(),
  use: vi.fn()
})

describe('useComponents', () => {
  it('有 install 方法的组件调用 app.use', () => {
    const app = createMockApp()
    useComponents(app as any)
    expect(app.use).toHaveBeenCalled()
  })

  it('无 install 方法的组件用 app.component 注册', () => {
    const app = createMockApp()
    useComponents(app as any)
    expect(app.component).toHaveBeenCalledWith('MIcon', expect.any(Object))
    expect(app.component).toHaveBeenCalledWith('ElInput', expect.any(Object))
    expect(app.component).toHaveBeenCalledWith(
      'ElDatePicker',
      expect.any(Object)
    )
    expect(app.component).toHaveBeenCalledWith(
      'MTreeSelect',
      expect.any(Object)
    )
    expect(app.component).toHaveBeenCalledWith('MEditor', expect.any(Object))
  })

  it('图标注册加 Icon 前缀', () => {
    const app = createMockApp()
    useComponents(app as any)
    expect(app.component).toHaveBeenCalledWith(
      'IconEdit',
      expect.objectContaining({ name: 'Edit' })
    )
  })

  it('图标无 name 时用 key 作为名称', () => {
    const app = createMockApp()
    useComponents(app as any)
    expect(app.component).toHaveBeenCalledWith('IconDelete', expect.any(Object))
  })
})

describe('useComponentsAll', () => {
  it('动态导入 element-plus 并调用 app.use', async () => {
    const app = createMockApp()
    useComponentsAll(app as any)
    await vi.waitFor(() => {
      expect(app.use).toHaveBeenCalled()
    })
  })

  it('动态导入 @/components 注册有 install 方法的组件', async () => {
    const app = createMockApp()
    useComponentsAll(app as any)
    await vi.waitFor(() => {
      expect(app.use).toHaveBeenCalled()
    })
  })

  it('同步注册图标', () => {
    const app = createMockApp()
    useComponentsAll(app as any)
    expect(app.component).toHaveBeenCalledWith('IconEdit', expect.any(Object))
    expect(app.component).toHaveBeenCalledWith('IconDelete', expect.any(Object))
  })
})
