import { useRemLayout } from '../useRemLayout'

describe('useRemLayout', () => {
  beforeEach(() => {
    document.documentElement.style.fontSize = ''
    document.body.style.fontSize = ''
  })

  it('应返回 start、cancel 和 setHtmlFontSize 函数', () => {
    const { start, cancel, setHtmlFontSize } = useRemLayout()
    expect(typeof start).toBe('function')
    expect(typeof cancel).toBe('function')
    expect(typeof setHtmlFontSize).toBe('function')
  })

  it('调用 start 后应设置 html fontSize', () => {
    const { start, cancel } = useRemLayout({
      fontSize: 100,
      width: 1920,
      height: 1080
    })

    const container = document.createElement('div')
    Object.defineProperty(container, 'clientWidth', { value: 1920 })
    Object.defineProperty(container, 'clientHeight', { value: 1080 })

    start(container)

    expect(document.documentElement.style.fontSize).toBe('100px')
    expect(document.body.style.fontSize).toBe('0.16rem')

    cancel()
  })

  it('调用 cancel 后应清理样式', () => {
    const { start, cancel } = useRemLayout()

    const container = document.createElement('div')
    Object.defineProperty(container, 'clientWidth', { value: 1920 })
    Object.defineProperty(container, 'clientHeight', { value: 1080 })

    start(container)
    cancel()

    expect(document.documentElement.style.fontSize).toBe('')
    expect(document.body.style.fontSize).toBe('')
  })

  it('不应重复 start', () => {
    const { start, cancel } = useRemLayout()

    const container1 = document.createElement('div')
    Object.defineProperty(container1, 'clientWidth', { value: 1920 })
    Object.defineProperty(container1, 'clientHeight', { value: 1080 })
    start(container1)

    const firstFontSize = document.documentElement.style.fontSize

    const container2 = document.createElement('div')
    Object.defineProperty(container2, 'clientWidth', { value: 960 })
    Object.defineProperty(container2, 'clientHeight', { value: 540 })
    start(container2)

    expect(document.documentElement.style.fontSize).toBe(firstFontSize)

    cancel()
  })

  it('根据容器尺寸等比缩放 fontSize', () => {
    const { start, cancel } = useRemLayout({
      fontSize: 100,
      width: 1920,
      height: 1080
    })

    const container = document.createElement('div')
    Object.defineProperty(container, 'clientWidth', { value: 960 })
    Object.defineProperty(container, 'clientHeight', { value: 540 })

    start(container)

    expect(document.documentElement.style.fontSize).toBe('50px')

    cancel()
  })

  it('start 注册 resize 和 orientationchange 监听器，cancel 移除', () => {
    const { start, cancel } = useRemLayout()
    const addSpy = vi.spyOn(window, 'addEventListener')
    const removeSpy = vi.spyOn(window, 'removeEventListener')

    const container = document.createElement('div')
    Object.defineProperty(container, 'clientWidth', { value: 1920 })
    Object.defineProperty(container, 'clientHeight', { value: 1080 })

    start(container)
    expect(addSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    expect(addSpy).toHaveBeenCalledWith(
      'orientationchange',
      expect.any(Function)
    )

    cancel()
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function))
    expect(removeSpy).toHaveBeenCalledWith(
      'orientationchange',
      expect.any(Function)
    )
  })

  it('start 前调用 setHtmlFontSize 应为空操作', () => {
    const { setHtmlFontSize } = useRemLayout()
    setHtmlFontSize()
    expect(document.documentElement.style.fontSize).toBe('')
  })

  it('容器尺寸为零时 scale 应返回 1', () => {
    const { start, cancel } = useRemLayout()

    const container = document.createElement('div')
    Object.defineProperty(container, 'clientWidth', { value: 0 })
    Object.defineProperty(container, 'clientHeight', { value: 540 })

    start(container)
    expect(document.documentElement.style.fontSize).toBe('100px')

    cancel()
  })

  it('cancel 应调用 debounce cancel 方法', () => {
    const { start, cancel } = useRemLayout()
    const addSpy = vi.spyOn(window, 'addEventListener')

    const container = document.createElement('div')
    Object.defineProperty(container, 'clientWidth', { value: 1920 })
    Object.defineProperty(container, 'clientHeight', { value: 1080 })

    start(container)

    // 从 addEventListener 调用中捕获 debounced 函数
    const debouncedFn = addSpy.mock.calls[0][1] as (() => void) & {
      cancel: () => void
    }
    const cancelSpy = vi.spyOn(debouncedFn, 'cancel')

    cancel()
    expect(cancelSpy).toHaveBeenCalled()
  })

  it('自定义配置值应正确应用', () => {
    const { start, cancel } = useRemLayout({
      fontSize: 200,
      width: 800,
      height: 600
    })

    const container = document.createElement('div')
    Object.defineProperty(container, 'clientWidth', { value: 400 })
    Object.defineProperty(container, 'clientHeight', { value: 300 })

    start(container)
    expect(document.documentElement.style.fontSize).toBe('100px')

    cancel()
  })

  it('非等比容器应按约束维度缩放', () => {
    const { start, cancel } = useRemLayout()

    // 宽度匹配但高度只有一半，scale 应为 0.5
    const container = document.createElement('div')
    Object.defineProperty(container, 'clientWidth', { value: 1920 })
    Object.defineProperty(container, 'clientHeight', { value: 540 })

    start(container)
    expect(document.documentElement.style.fontSize).toBe('50px')

    cancel()
  })
})
