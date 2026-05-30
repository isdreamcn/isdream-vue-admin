import { effectScope, nextTick } from 'vue'
import { setCssVariable, useCssVariable } from '../theme/useCssVariable'

describe('setCssVariable', () => {
  afterEach(() => {
    document.documentElement.style.removeProperty('--test-var')
  })

  it('设置指定 CSS 变量', () => {
    setCssVariable('--test-var', 'red')
    expect(document.documentElement.style.getPropertyValue('--test-var')).toBe(
      'red'
    )
  })

  it('value 为 undefined 时不应设置属性', () => {
    document.documentElement.style.setProperty('--test-var', 'initial')
    setCssVariable('--test-var')
    expect(document.documentElement.style.getPropertyValue('--test-var')).toBe(
      'initial'
    )
  })
})

describe('useCssVariable', () => {
  const testVars: string[] = []

  afterEach(() => {
    testVars.forEach((v) => document.documentElement.style.removeProperty(v))
    testVars.length = 0
  })

  it('ref 应从 inline style 初始化', () => {
    document.documentElement.style.setProperty('--init-var', '42px')
    testVars.push('--init-var')

    const cssVar = useCssVariable('--init-var')
    expect(cssVar.value).toBe('42px')
  })

  it('传入初始 value 时应设置到 DOM', () => {
    testVars.push('--value-var')

    const cssVar = useCssVariable('--value-var', 'hello')
    expect(document.documentElement.style.getPropertyValue('--value-var')).toBe(
      'hello'
    )
    expect(cssVar.value).toBe('hello')
  })

  it('修改 ref 值应同步到 DOM', async () => {
    testVars.push('--sync-var')

    const cssVar = useCssVariable('--sync-var')
    cssVar.value = 'updated'
    await nextTick()
    expect(document.documentElement.style.getPropertyValue('--sync-var')).toBe(
      'updated'
    )
  })

  it('在 effectScope 中使用时 scope 销毁后 watcher 停止', () => {
    testVars.push('--scope-var')

    let cssVar: ReturnType<typeof useCssVariable>

    const scope = effectScope()
    scope.run(() => {
      cssVar = useCssVariable('--scope-var', 'initial')
    })

    scope.stop()
    cssVar!.value = 'after-dispose'

    // watcher 已停止，DOM 不应更新
    expect(document.documentElement.style.getPropertyValue('--scope-var')).toBe(
      'initial'
    )
  })
})
