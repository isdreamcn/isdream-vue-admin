import type { DirectiveBinding, ObjectDirective } from 'vue'
import { auth } from '../auth'

const authDirective = auth as ObjectDirective<HTMLElement, string | undefined>

const { mockCheckAuth } = vi.hoisted(() => ({
  mockCheckAuth: vi.fn()
}))

vi.mock(import('@/utils'), () => ({
  checkAuth: mockCheckAuth
}))

function createBinding(
  value?: string,
  arg?: string
): DirectiveBinding<string | undefined> {
  return {
    instance: null,
    value,
    oldValue: null,
    arg,
    modifiers: {},
    dir: {}
  }
}

describe('v-auth 指令', () => {
  let el: HTMLElement

  beforeEach(() => {
    el = document.createElement('div')
    document.body.appendChild(el)
  })

  afterEach(() => {
    el.remove()
  })

  it('value 和 arg 都为空时不做任何操作', () => {
    authDirective.mounted!(
      el,
      createBinding(undefined, undefined),
      null!,
      null!
    )
    expect(mockCheckAuth).not.toHaveBeenCalled()
    expect(el.parentNode).not.toBeNull()
  })

  it('使用 value 传入权限且校验通过时保留元素', () => {
    mockCheckAuth.mockReturnValue(true)
    authDirective.mounted!(el, createBinding('admin', undefined), null!, null!)
    expect(mockCheckAuth).toHaveBeenCalledWith('admin')
    expect(el.parentNode).not.toBeNull()
  })

  it('使用 value 传入权限且校验失败时移除元素', () => {
    mockCheckAuth.mockReturnValue(false)
    authDirective.mounted!(el, createBinding('admin', undefined), null!, null!)
    expect(el.parentNode).toBeNull()
  })

  it('使用 arg 传入权限且校验通过时保留元素', () => {
    mockCheckAuth.mockReturnValue(true)
    authDirective.mounted!(el, createBinding(undefined, 'edit'), null!, null!)
    expect(mockCheckAuth).toHaveBeenCalledWith('edit')
    expect(el.parentNode).not.toBeNull()
  })

  it('使用 arg 传入权限且校验失败时移除元素', () => {
    mockCheckAuth.mockReturnValue(false)
    authDirective.mounted!(el, createBinding(undefined, 'edit'), null!, null!)
    expect(el.parentNode).toBeNull()
  })

  it('value 优先于 arg', () => {
    mockCheckAuth.mockReturnValue(true)
    authDirective.mounted!(el, createBinding('admin', 'edit'), null!, null!)
    expect(mockCheckAuth).toHaveBeenCalledWith('admin')
  })

  it('value 为 undefined 时回退到 arg', () => {
    mockCheckAuth.mockReturnValue(true)
    authDirective.mounted!(el, createBinding(undefined, 'super'), null!, null!)
    expect(mockCheckAuth).toHaveBeenCalledWith('super')
  })

  it('value 为空字符串时不做任何操作', () => {
    authDirective.mounted!(el, createBinding('', undefined), null!, null!)
    expect(mockCheckAuth).not.toHaveBeenCalled()
    expect(el.parentNode).not.toBeNull()
  })
})
