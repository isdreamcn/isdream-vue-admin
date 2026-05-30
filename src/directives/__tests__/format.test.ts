import type { DirectiveBinding, FunctionDirective } from 'vue'
import type { ConfigType } from 'dayjs'
import { dateFormat } from '../format'

const dateFormatDirective = dateFormat as FunctionDirective<
  HTMLElement,
  ConfigType
>

const { mockDateFormat } = vi.hoisted(() => ({
  mockDateFormat: vi.fn()
}))

vi.mock(import('@/utils'), () => ({
  dateFormat: mockDateFormat
}))

function createBinding(
  value?: ConfigType,
  arg?: string,
  modifiers?: Record<string, boolean>
): DirectiveBinding<ConfigType> {
  return {
    instance: null,
    value,
    oldValue: null,
    arg,
    modifiers: modifiers ?? {},
    dir: {}
  }
}

describe('v-dateFormat 指令', () => {
  let el: HTMLElement

  beforeEach(() => {
    el = document.createElement('span')
    document.body.appendChild(el)
  })

  afterEach(() => {
    el.remove()
  })

  it('value 为有效日期时设置 textContent', () => {
    mockDateFormat.mockReturnValue('2024-01-15 00:00:00')
    dateFormatDirective(el, createBinding('2024-01-15'), null!, null!)
    expect(mockDateFormat).toHaveBeenCalledWith('2024-01-15', undefined)
    expect(el.textContent).toBe('2024-01-15 00:00:00')
  })

  it('value 为 undefined 时回退到 el.textContent', () => {
    el.textContent = '2024-06-01'
    mockDateFormat.mockReturnValue('2024-06-01 00:00:00')
    dateFormatDirective(el, createBinding(undefined), null!, null!)
    expect(mockDateFormat).toHaveBeenCalledWith('2024-06-01', undefined)
    expect(el.textContent).toBe('2024-06-01 00:00:00')
  })

  it('value 为空字符串时不做任何操作', () => {
    dateFormatDirective(el, createBinding(''), null!, null!)
    expect(mockDateFormat).not.toHaveBeenCalled()
  })

  it('value 为 null 时不做任何操作', () => {
    dateFormatDirective(el, createBinding(null as any), null!, null!)
    expect(mockDateFormat).not.toHaveBeenCalled()
  })

  it('el.textContent 为空且 value 为 undefined 时不做任何操作', () => {
    dateFormatDirective(el, createBinding(undefined), null!, null!)
    expect(mockDateFormat).not.toHaveBeenCalled()
  })

  it('使用 arg 指定格式模板', () => {
    mockDateFormat.mockReturnValue('2024-01-15')
    dateFormatDirective(
      el,
      createBinding('2024-01-15 10:30:00', 'YYYY-MM-DD'),
      null!,
      null!
    )
    expect(mockDateFormat).toHaveBeenCalledWith(
      '2024-01-15 10:30:00',
      'YYYY-MM-DD'
    )
    expect(el.textContent).toBe('2024-01-15')
  })

  it('使用 .space 修饰符将 __ 替换为空格', () => {
    mockDateFormat.mockReturnValue('2024 01 15')
    dateFormatDirective(
      el,
      createBinding('2024-01-15 10:30:00', 'YYYY__MM__DD', { space: true }),
      null!,
      null!
    )
    expect(mockDateFormat).toHaveBeenCalledWith(
      '2024-01-15 10:30:00',
      'YYYY MM DD'
    )
  })

  it('有 arg 但没有 .space 修饰符时不替换 __', () => {
    mockDateFormat.mockReturnValue('20240115')
    dateFormatDirective(
      el,
      createBinding('2024-01-15 10:30:00', 'YYYY__MM__DD'),
      null!,
      null!
    )
    expect(mockDateFormat).toHaveBeenCalledWith(
      '2024-01-15 10:30:00',
      'YYYY__MM__DD'
    )
  })

  it('有 .space 修饰符但没有 arg 时不触发替换逻辑', () => {
    mockDateFormat.mockReturnValue('2024-01-15 00:00:00')
    dateFormatDirective(
      el,
      createBinding('2024-01-15', undefined, { space: true }),
      null!,
      null!
    )
    expect(mockDateFormat).toHaveBeenCalledWith('2024-01-15', undefined)
  })

  it('多个 __ 全部替换（replaceAll）', () => {
    mockDateFormat.mockReturnValue('2024 01 15 10')
    dateFormatDirective(
      el,
      createBinding('2024-01-15 10:30:00', 'YYYY__MM__DD__HH', { space: true }),
      null!,
      null!
    )
    expect(mockDateFormat).toHaveBeenCalledWith(
      '2024-01-15 10:30:00',
      'YYYY MM DD HH'
    )
  })

  it('value 为时间戳数字时正常工作', () => {
    mockDateFormat.mockReturnValue('2024-01-15 08:00:00')
    dateFormatDirective(el, createBinding(1705305600000), null!, null!)
    expect(mockDateFormat).toHaveBeenCalledWith(1705305600000, undefined)
    expect(el.textContent).toBe('2024-01-15 08:00:00')
  })
})
