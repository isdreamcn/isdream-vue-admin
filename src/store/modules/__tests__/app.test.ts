import { createPinia, setActivePinia } from 'pinia'
import db from '@/storage'
import { setCssVariable, applyThemeClass } from '@/hooks'
import { useAppStore, useAppSetting } from '../app'

vi.mock(
  import('@/storage'),
  () =>
    ({
      default: {
        get: vi.fn(),
        set: vi.fn(),
        setData: vi.fn()
      }
    }) as any
)

vi.mock(import('@/hooks'), () => ({
  setCssVariable: vi.fn(),
  applyThemeClass: vi.fn()
}))

describe('useAppStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('初始状态', () => {
    it('默认 theme 为 light', () => {
      const store = useAppStore()
      expect(store.theme).toBe('light')
    })

    it('默认 appSetting 为完整默认值（使用 toEqual 检查关键属性）', () => {
      const store = useAppStore()
      expect(store.appSetting).toEqual(
        expect.objectContaining({
          colorPrimary: '#409EFF',
          layout: 'mainLayout',
          showLogo: true,
          menu: expect.objectContaining({
            mergeTopMenu: true,
            collapsed: false,
            mode: 'vertical',
            backgroundColor: '#ffffff',
            textColor: '#303133',
            hoverBackgroundColor: '#ecf5ff'
          }),
          breadcrumb: expect.objectContaining({
            show: true,
            icon: true
          }),
          routeHistory: expect.objectContaining({
            show: true,
            actions: true
          }),
          footer: expect.objectContaining({
            show: true
          })
        })
      )
    })
  })

  describe('setupState', () => {
    it('从 db 读取 theme 并 patch 到 store', () => {
      vi.mocked(db.get).mockImplementation((key: string) => {
        if (key === 'theme') return 'dark'
        return null
      })
      const store = useAppStore()
      store.setupState()
      expect(store.theme).toBe('dark')
    })

    it('从 db 读取 appSetting 并 patch 到 store', () => {
      const customSetting = {
        colorPrimary: '#FF0000',
        layout: 'mainLayout',
        showLogo: false,
        menu: {
          mergeTopMenu: false,
          collapsed: true,
          mode: 'horizontal',
          backgroundColor: '#000',
          textColor: '#fff',
          hoverBackgroundColor: '#333'
        },
        breadcrumb: { show: false, icon: false },
        routeHistory: { show: false, actions: false },
        footer: { show: false }
      }
      vi.mocked(db.get).mockImplementation((key: string) => {
        if (key === 'appSetting') return customSetting
        return null
      })
      const store = useAppStore()
      store.setupState()
      expect(store.appSetting).toEqual(customSetting)
    })

    it('db 返回非法 theme 值时保持默认 theme', () => {
      vi.mocked(db.get).mockImplementation((key: string) => {
        if (key === 'theme') return 'invalid'
        return null
      })
      const store = useAppStore()
      store.setupState()
      expect(store.theme).toBe('light')
    })

    it('db 返回 null 时保持默认 appSetting', () => {
      vi.mocked(db.get).mockReturnValue(null)
      const store = useAppStore()
      store.setupState()
      expect(store.appSetting.colorPrimary).toBe('#409EFF')
    })

    it('调用 setRootCss（验证 applyThemeClass 被调用）', () => {
      vi.mocked(db.get).mockReturnValue(null)
      const store = useAppStore()
      store.setupState()
      expect(applyThemeClass).toHaveBeenCalled()
    })
  })

  describe('setRootCss', () => {
    it('调用 applyThemeClass', () => {
      const store = useAppStore()
      store.setRootCss()
      expect(applyThemeClass).toHaveBeenCalled()
    })

    it('调用 setCssVariable 设置 4 个 CSS 变量（验证参数）', () => {
      const store = useAppStore()
      store.setRootCss()
      expect(setCssVariable).toHaveBeenCalledWith(
        '--el-color-primary',
        '#409EFF'
      )
      expect(setCssVariable).toHaveBeenCalledWith('--bg-color', '#ffffff')
      expect(setCssVariable).toHaveBeenCalledWith('--text-color', '#303133')
      expect(setCssVariable).toHaveBeenCalledWith('--hover-bg-color', '#ecf5ff')
      expect(setCssVariable).toHaveBeenCalledTimes(4)
    })
  })

  describe('setState', () => {
    it('使用 $patch 更新 state', () => {
      const store = useAppStore()
      store.setState({ theme: 'dark' as const })
      expect(store.theme).toBe('dark')
    })

    it('调用 db.setData 传入 state 和 dbOptions', () => {
      const store = useAppStore()
      const state = { theme: 'dark' as const }
      const options = { encrypt: true }
      store.setState(state, options as any)
      expect(db.setData).toHaveBeenCalledWith(state, options)
    })
  })

  describe('setAppSetting', () => {
    it('深度合并传入的 appSetting 到当前 appSetting（不破坏其他字段）', () => {
      const store = useAppStore()
      store.setAppSetting({ colorPrimary: '#FF0000' })
      expect(store.appSetting.colorPrimary).toBe('#FF0000')
      expect(store.appSetting.showLogo).toBe(true)
      expect(store.appSetting.menu.collapsed).toBe(false)
    })

    it('深度合并嵌套属性（如 menu.collapsed）', () => {
      const store = useAppStore()
      store.setAppSetting({ menu: { collapsed: true } })
      expect(store.appSetting.menu.collapsed).toBe(true)
      expect(store.appSetting.menu.mode).toBe('vertical')
      expect(store.appSetting.menu.backgroundColor).toBe('#ffffff')
    })

    it('调用 db.set 存储 appSetting', () => {
      const store = useAppStore()
      store.setAppSetting({ colorPrimary: '#FF0000' })
      expect(db.set).toHaveBeenCalledWith('appSetting', store.appSetting)
    })

    it('调用 setRootCss 更新样式', () => {
      const store = useAppStore()
      store.setAppSetting({ colorPrimary: '#FF0000' })
      expect(applyThemeClass).toHaveBeenCalled()
      expect(setCssVariable).toHaveBeenCalledWith(
        '--el-color-primary',
        '#FF0000'
      )
    })
  })

  describe('resetAppSetting', () => {
    it('将 appSetting 恢复为默认值', () => {
      const store = useAppStore()
      store.setAppSetting({ colorPrimary: '#FF0000', showLogo: false })
      store.resetAppSetting()
      expect(store.appSetting.colorPrimary).toBe('#409EFF')
      expect(store.appSetting.showLogo).toBe(true)
    })

    it('恢复后所有嵌套属性均恢复默认', () => {
      const store = useAppStore()
      store.setAppSetting({
        menu: { collapsed: true, mode: 'horizontal' },
        breadcrumb: { show: false },
        routeHistory: { actions: false },
        footer: { show: false }
      })
      store.resetAppSetting()
      expect(store.appSetting.menu.collapsed).toBe(false)
      expect(store.appSetting.menu.mode).toBe('vertical')
      expect(store.appSetting.breadcrumb.show).toBe(true)
      expect(store.appSetting.routeHistory.actions).toBe(true)
      expect(store.appSetting.footer.show).toBe(true)
    })

    it('调用 db.set 存储 appSetting', () => {
      const store = useAppStore()
      store.resetAppSetting()
      expect(db.set).toHaveBeenCalledWith('appSetting', store.appSetting)
    })

    it('调用 setRootCss 更新样式', () => {
      const store = useAppStore()
      store.resetAppSetting()
      expect(applyThemeClass).toHaveBeenCalled()
      expect(setCssVariable).toHaveBeenCalledWith(
        '--el-color-primary',
        '#409EFF'
      )
    })
  })
})

describe('useAppSetting', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('返回 appSetting computed', () => {
    const { appSetting } = useAppSetting()
    expect(appSetting.value.colorPrimary).toBe('#409EFF')
    expect(appSetting.value.showLogo).toBe(true)
  })

  it('返回 appTheme computed', () => {
    const { appTheme } = useAppSetting()
    expect(appTheme.value).toBe('light')
  })

  it('appIsDark 在 theme 为 dark 时返回 true', () => {
    const store = useAppStore()
    store.$patch({ theme: 'dark' })
    const { appIsDark } = useAppSetting()
    expect(appIsDark.value).toBe(true)
  })

  it('appIsDark 在 theme 为 light 时返回 false', () => {
    const { appIsDark } = useAppSetting()
    expect(appIsDark.value).toBe(false)
  })
})
