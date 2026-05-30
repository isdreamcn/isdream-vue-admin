import { definePropType, buildProp, buildProps } from '../props'

vi.mock(import('../../plugins'), async () => {
  const actual = await vi.importActual('../../plugins')
  return {
    ...actual,
    warn: vi.fn()
  }
})

import { warn } from '../../plugins'

describe('definePropType', () => {
  it('返回传入的值', () => {
    const result = definePropType<string>(String)
    expect(result).toBe(String)
  })
})

describe('buildProp', () => {
  it('非对象 prop 直接返回', () => {
    const result = buildProp(String as any)
    expect(result).toBe(String)
  })

  it('设置 type 和 required', () => {
    const result = buildProp({ type: String, required: true })
    expect(result.type).toBe(String)
    expect(result.required).toBe(true)
  })

  it('required 默认为 false', () => {
    const result = buildProp({ type: String })
    expect(result.required).toBe(false)
  })

  it('设置 default 值', () => {
    const result = buildProp({ type: String, default: 'hello' } as any)
    expect(result.default).toBe('hello')
  })

  it('未提供 default 时不设置 default 属性', () => {
    const result = buildProp({ type: String, required: true })
    expect(result.default).toBeUndefined()
  })

  it('values 生成 validator，通过时返回 true', () => {
    const result = buildProp({ values: ['a', 'b', 'c'] })
    expect(result.validator!('a')).toBe(true)
  })

  it('values 生成 validator，不通过时返回 false 并调用 warn', () => {
    const result = buildProp({ values: ['a', 'b'] }, 'myProp')
    expect(result.validator!('x')).toBe(false)
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('myProp'))
  })

  it('values + default 将 default 加入允许值', () => {
    const result = buildProp({ values: ['a'], default: 'b' })
    expect(result.validator!('b')).toBe(true)
  })

  it('values 包含 default 时不重复', () => {
    const result = buildProp({ values: ['a', 'b'], default: 'a' }, 'test')
    result.validator!('x')
    const warnMsg = (warn as ReturnType<typeof vi.fn>).mock.calls[0][0]
    expect(warnMsg).toContain('"a", "b"')
  })

  it('自定义 validator 函数', () => {
    const validator = (val: any) => typeof val === 'number'
    const result = buildProp({ validator })
    expect(result.validator!(42)).toBe(true)
    expect(result.validator!('str')).toBe(false)
  })

  it('values + validator 同时存在时 union 判断', () => {
    const result = buildProp({
      values: ['a'],
      validator: (val: any) => val === 'b'
    })
    expect(result.validator!('a')).toBe(true)
    expect(result.validator!('b')).toBe(true)
    expect(result.validator!('c')).toBe(false)
  })

  it('无 values 且无 validator 时 validator 为 undefined', () => {
    const result = buildProp({ type: String })
    expect(result.validator).toBeUndefined()
  })
})

describe('buildProps', () => {
  it('批量处理 props 定义', () => {
    const result = buildProps({
      name: String,
      age: { type: Number, default: 18 }
    })
    expect(result.name).toBe(String)
    expect(result.age.type).toBe(Number)
    expect(result.age.default).toBe(18)
  })

  it('混合 NativePropType 和 PropInput', () => {
    const result = buildProps({
      title: String,
      visible: { type: Boolean, required: true }
    })
    expect(result.title).toBe(String)
    expect(result.visible.required).toBe(true)
  })
})
