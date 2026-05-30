import { hasOwn, NOOP, isObject, isPromise, isBlob } from '../plugins'

describe('hasOwn', () => {
  it('对象自身属性返回 true', () => {
    expect(hasOwn({ a: 1 }, 'a')).toBe(true)
  })

  it('继承属性返回 false', () => {
    const obj = Object.create({ inherited: true })
    expect(hasOwn(obj, 'inherited')).toBe(false)
  })

  it('不存在的属性返回 false', () => {
    expect(hasOwn({}, 'missing')).toBe(false)
  })

  it('Symbol 键也能检测', () => {
    const sym = Symbol('test')
    expect(hasOwn({ [sym]: 1 }, sym)).toBe(true)
  })
})

describe('NOOP', () => {
  it('调用返回 undefined', () => {
    expect(NOOP()).toBeUndefined()
  })

  it('可作为默认回调安全调用', () => {
    const callback = NOOP
    expect(() => callback()).not.toThrow()
  })
})

describe('isObject', () => {
  it('普通对象返回 true', () => {
    expect(isObject({})).toBe(true)
  })

  it('数组返回 true', () => {
    expect(isObject([])).toBe(true)
  })

  it('null 返回 false', () => {
    expect(isObject(null)).toBe(false)
  })

  it('数字返回 false', () => {
    expect(isObject(42)).toBe(false)
  })

  it('字符串返回 false', () => {
    expect(isObject('hello')).toBe(false)
  })

  it('函数返回 false', () => {
    expect(isObject(() => {})).toBe(false)
  })
})

describe('isPromise', () => {
  it('Promise 实例返回 true', () => {
    expect(isPromise(Promise.resolve())).toBe(true)
  })

  it('thenable 但无 catch 返回 false', () => {
    expect(isPromise({ then: () => {} })).toBe(false)
  })

  it('普通对象返回 false', () => {
    expect(isPromise({})).toBe(false)
  })

  it('null 返回 false', () => {
    expect(isPromise(null)).toBe(false)
  })

  it('字符串返回 false', () => {
    expect(isPromise('promise')).toBe(false)
  })
})

describe('isBlob', () => {
  it('Blob 实例返回 true', () => {
    expect(isBlob(new Blob(['content']))).toBe(true)
  })

  it('普通对象返回 false', () => {
    expect(isBlob({})).toBe(false)
  })

  it('null 返回 false', () => {
    expect(isBlob(null)).toBe(false)
  })

  it('字符串返回 false', () => {
    expect(isBlob('blob')).toBe(false)
  })
})
