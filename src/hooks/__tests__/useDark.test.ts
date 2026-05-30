import { createPinia, setActivePinia } from 'pinia'
import { applyThemeClass, useDark } from '../theme/useDark'
import { useAppStore } from '@/store/modules/app'

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

describe('applyThemeClass', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.documentElement.classList.remove('dark', 'light')
  })

  afterEach(() => {
    document.documentElement.classList.remove('dark', 'light')
  })

  it('theme 为 dark 时添加 dark 类名并移除 light', () => {
    const store = useAppStore()
    store.$patch({ theme: 'dark' })
    document.documentElement.classList.add('light')

    applyThemeClass()

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.classList.contains('light')).toBe(false)
  })

  it('theme 为 light 时添加 light 类名并移除 dark', () => {
    document.documentElement.classList.add('dark')

    applyThemeClass()

    expect(document.documentElement.classList.contains('light')).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('应先移除所有主题类名再添加新的', () => {
    const store = useAppStore()
    store.$patch({ theme: 'dark' })
    document.documentElement.classList.add('dark', 'light')

    applyThemeClass()

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.classList.contains('light')).toBe(false)
  })
})

describe('useDark', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    document.documentElement.classList.remove('dark', 'light')
  })

  afterEach(() => {
    document.documentElement.classList.remove('dark', 'light')
  })

  it('isDark 在 theme 为 dark 时返回 true', () => {
    const store = useAppStore()
    store.$patch({ theme: 'dark' })

    const { isDark } = useDark()
    expect(isDark.value).toBe(true)
  })

  it('isDark 在 theme 为 light 时返回 false', () => {
    const { isDark } = useDark()
    expect(isDark.value).toBe(false)
  })

  it('toggleDark 从 dark 切换到 light', () => {
    const store = useAppStore()
    store.$patch({ theme: 'dark' })

    const { toggleDark } = useDark()
    toggleDark()

    expect(store.theme).toBe('light')
    expect(document.documentElement.classList.contains('light')).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('toggleDark 从 light 切换到 dark', () => {
    const store = useAppStore()

    const { toggleDark } = useDark()
    toggleDark()

    expect(store.theme).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(document.documentElement.classList.contains('light')).toBe(false)
  })
})
