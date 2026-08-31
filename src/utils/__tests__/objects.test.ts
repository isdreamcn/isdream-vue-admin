import { ElMessage } from 'element-plus'
import {
  createMergeObjFn,
  mergeObjDeep,
  getVal,
  generateObj,
  updateObjKeys,
  verifyObj,
  composeFns
} from '../objects'

vi.mock(
  import('element-plus'),
  () =>
    ({
      ElMessage: {
        info: vi.fn()
      }
    }) as any
)

describe('createMergeObjFn', () => {
  it('浅合并：不递归合并嵌套对象', () => {
    const shallowMerge = createMergeObjFn({
      deep: false,
      overlayable: () => true
    })
    const obj1 = { a: { x: 1 } }
    const obj2 = { a: { y: 2 } }
    const result = shallowMerge(obj1, obj2)
    expect(result.a).toEqual({ y: 2 })
  })

  it('深合并：递归合并嵌套对象', () => {
    const deepMerge = createMergeObjFn({
      deep: true,
      overlayable: () => true
    })
    const obj1 = { a: { x: 1 } }
    const obj2 = { a: { y: 2 } }
    const result = deepMerge(obj1, obj2)
    expect(result.a).toEqual({ x: 1, y: 2 })
  })

  it('overlayable 返回 false 时跳过该 key', () => {
    const merge = createMergeObjFn({
      deep: false,
      overlayable: (_val, key) => key !== 'b'
    })
    const result = merge({ a: 1, b: 2 }, { a: 10, b: 20 })
    expect(result.a).toBe(10)
    expect(result.b).toBe(2)
  })

  it('数组 obj1 使用展开', () => {
    const merge = createMergeObjFn({
      deep: false,
      overlayable: () => true
    })
    const result = merge([1, 2], { 1: 99 } as any)
    expect(Array.isArray(result)).toBe(true)
    expect(result[1]).toBe(99)
  })

  it('不修改原始对象', () => {
    const merge = createMergeObjFn({
      deep: false,
      overlayable: () => true
    })
    const obj1 = { a: 1 }
    const obj2 = { b: 2 }
    merge(obj1, obj2)
    expect(obj1).toEqual({ a: 1 })
    expect(obj2).toEqual({ b: 2 })
  })
})

describe('mergeObjDeep', () => {
  it('递归深度合并两个对象', () => {
    const result = mergeObjDeep(
      { a: { b: { c: 1 } }, d: 2 },
      { a: { b: { e: 3 } }, f: 4 }
    )
    expect(result).toEqual({ a: { b: { c: 1, e: 3 } }, d: 2, f: 4 })
  })

  it('obj1 不存在的 key 直接赋值', () => {
    const result = mergeObjDeep({ a: 1 }, { b: 2 })
    expect(result).toEqual({ a: 1, b: 2 })
  })
})

describe('getVal', () => {
  it('点号路径访问嵌套属性', () => {
    expect(getVal({ a: { b: { c: 42 } } }, 'a.b.c')).toBe(42)
  })

  it('方括号路径访问数组索引', () => {
    expect(getVal({ items: ['a', 'b', 'c'] }, 'items[1]')).toBe('b')
  })

  it('混合点号和方括号', () => {
    expect(getVal({ a: [{ b: 1 }, { b: 2 }] }, 'a[1].b')).toBe(2)
  })

  it('路径不存在返回 undefined', () => {
    expect(getVal({ a: 1 }, 'b.c')).toBeUndefined()
  })

  it('form 不是对象时返回 undefined', () => {
    expect(getVal(null as any, 'a.b')).toBeUndefined()
  })

  it('空字符串路径', () => {
    expect(getVal({}, '')).toBeUndefined()
  })

  it('以点号开头的路径去掉前导点号', () => {
    expect(getVal({ a: 1 }, '.a')).toBe(1)
  })
})

describe('generateObj', () => {
  it('从点号路径生成嵌套对象', () => {
    expect(generateObj('a.b.c', 5)).toEqual({ a: { b: { c: 5 } } })
  })

  it('从方括号路径生成数组', () => {
    expect(generateObj('[0].a', 5)).toEqual([{ a: 5 }])
  })

  it('单层 key 直接赋值', () => {
    expect(generateObj('name', 'test')).toEqual({ name: 'test' })
  })

  it('多层嵌套方括号生成嵌套结构', () => {
    const result = generateObj('[0].a.b', 'val')
    expect(result).toEqual([{ a: { b: 'val' } }])
  })
})

describe('updateObjKeys', () => {
  it('重映射对象的 key', () => {
    const obj = { oldKey: 'value' }
    const result = updateObjKeys(obj, { newKey: 'oldKey' })
    expect((result as any).newKey).toBe('value')
  })

  it('不修改原始对象（深拷贝）', () => {
    const obj = { oldKey: 'value' }
    updateObjKeys(obj, { newKey: 'oldKey' })
    expect(obj).toEqual({ oldKey: 'value' })
  })

  it('顶层为数组时递归处理每个元素', () => {
    const obj = [{ oldKey: 'v1' }, { oldKey: 'v2' }]
    const result = updateObjKeys(obj, { newKey: 'oldKey' })
    expect((result[0] as any).newKey).toBe('v1')
    expect((result[1] as any).newKey).toBe('v2')
  })

  it('childKey 参数递归处理子节点', () => {
    const obj = { oldKey: 'v1', children: [{ oldKey: 'v2', children: [] }] }
    const result = updateObjKeys(obj, { newKey: 'oldKey' }, 'children')
    expect((result.children[0] as any).newKey).toBe('v2')
  })

  it('childKey 为 false 时不递归处理子节点', () => {
    const obj = { oldKey: 'v1', children: [{ oldKey: 'v2' }] }
    const result = updateObjKeys(obj, { newKey: 'oldKey' }, false)
    expect((result.children[0] as any).newKey).toBeUndefined()
  })
})

describe('verifyObj', () => {
  it('所有字段通过验证返回 true', () => {
    const result = verifyObj({ name: '请输入姓名' }, { name: '张三' })
    expect(result).toBe(true)
  })

  it('字段未通过验证时调用 showMessage 并返回 false', () => {
    const showMessage = vi.fn()
    const result = verifyObj(
      { name: '请输入姓名' },
      { name: null },
      undefined,
      showMessage
    )
    expect(result).toBe(false)
    expect(showMessage).toHaveBeenCalledWith('请输入姓名')
  })

  it('tip 值为函数时调用该函数验证', () => {
    const validator = vi.fn().mockReturnValue('自定义错误')
    const showMessage = vi.fn()
    const result = verifyObj(
      { name: validator },
      { name: 'invalid' },
      undefined,
      showMessage
    )
    expect(validator).toHaveBeenCalledWith('invalid', 'name')
    expect(result).toBe(false)
    expect(showMessage).toHaveBeenCalledWith('自定义错误')
  })

  it('tip 函数返回 falsy 值时视为通过', () => {
    const validator = vi.fn().mockReturnValue(null)
    const result = verifyObj(
      { name: validator },
      { name: 'valid' },
      undefined,
      false
    )
    expect(result).toBe(true)
  })

  it('showMessage 为 false 时不调用消息', () => {
    const result = verifyObj(
      { name: '请输入姓名' },
      { name: null },
      undefined,
      false
    )
    expect(result).toBe(false)
  })

  it('自定义 verifyFn 替换默认验证逻辑', () => {
    const customVerify = (val: any) => typeof val === 'number'
    const result = verifyObj(
      { age: '年龄必须是数字' },
      { age: 'abc' },
      customVerify,
      false
    )
    expect(result).toBe(false)
  })

  it('默认使用 ElMessage.info', () => {
    verifyObj({ name: '请输入姓名' }, { name: null })
    expect(ElMessage.info).toHaveBeenCalledWith('请输入姓名')
  })
})

describe('composeFns', () => {
  it('从左到右组合函数', () => {
    const add1 = (x: number) => x + 1
    const double = (x: number) => x * 2
    const composed = composeFns([add1, double])
    expect(composed(3)).toBe(8)
  })

  it('空函数数组返回原值', () => {
    const composed = composeFns<number>([])
    expect(composed(42)).toBe(42)
  })

  it('单个函数直接执行', () => {
    const double = (x: number) => x * 2
    const composed = composeFns([double])
    expect(composed(5)).toBe(10)
  })

  it('pause 返回 true 时提前终止', () => {
    const fn1 = vi.fn((x: number) => x + 1)
    const fn2 = vi.fn((x: number) => x * 2)
    const pause = (result: number) => result > 5
    const composed = composeFns([fn1, fn2], pause)
    expect(composed(10)).toBe(11)
    expect(fn2).not.toHaveBeenCalled()
  })

  it('pause 返回 false 时继续执行', () => {
    const fn1 = vi.fn((x: number) => x + 1)
    const fn2 = vi.fn((x: number) => x * 2)
    const pause = (result: number) => result > 100
    const composed = composeFns([fn1, fn2], pause)
    expect(composed(3)).toBe(8)
    expect(fn2).toHaveBeenCalled()
  })

  it('传递字符串 payload 贯穿所有函数', () => {
    const fns = [
      (s: string) => s.toUpperCase(),
      (s: string) => s.split('').reverse().join('')
    ]
    const composed = composeFns(fns)
    expect(composed('abc')).toBe('CBA')
  })
})
