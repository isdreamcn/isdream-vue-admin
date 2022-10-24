import { isArray, isObject, hasOwn } from './index'

interface MergeObjOptions {
  deep: boolean
  // 是否覆盖原值
  overlayable: (
    val: any,
    key: string | number | symbol,
    obj1: object,
    obj2: object
  ) => boolean
}

// 合并对象
export const createMergeObjFn = (options: MergeObjOptions) => {
  const mergeObj = <T extends object = object, O extends object = object>(
    obj1: T,
    obj2: O
  ) => {
    let _o: any = { ...obj1 }
    if (isArray(obj1)) {
      _o = [...obj1]
    }
    for (const [key, value] of Object.entries(obj2)) {
      const _key = key as keyof O & string
      if (!options.overlayable(value, key, obj1, obj2)) {
        continue
      }
      if (
        options.deep &&
        hasOwn(obj1, _key) &&
        isObject(obj1[_key]) &&
        isObject(obj2[_key])
      ) {
        _o[_key] = mergeObj(obj1[_key], obj2[_key])
      } else {
        _o[_key] = obj2[_key]
      }
    }
    return _o as T & O
  }
  return mergeObj
}

export const mergeObjDeep = createMergeObjFn({
  deep: true,
  overlayable: () => true
})

export function getVal(form: any, s: string): any {
  if (!isObject(form)) {
    return
  }
  return s
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/^\./, '')
    .split('.')
    .reduce((prev: object | undefined, cur) => {
      if (prev && hasOwn(prev, cur)) {
        return prev[cur]
      }
    }, form)
}

// (a.b.c, 5) => { a: { b: { c: 5 } } }
// ([0].a, 5) => [{ a: 5 }]
export const generateObj = (key: string, val: any) => {
  // 数组标识
  const sign = '##'
  const signLen = sign.length

  let _key = key.replace(/\[(\w+)\]/g, `${sign}.$1`).replace(/^\./, '')
  let o: Record<string | number, any> = {}
  if (_key.startsWith(sign + '.')) {
    o = []
    _key = _key.slice(signLen + 1)
  }

  const keys = _key.split('.')
  let _o = o
  keys.forEach((k, index) => {
    if (index === keys.length - 1) {
      _o[k] = val
      return
    }
    if (k.endsWith(sign)) {
      k = k.slice(0, 0 - signLen)
      _o[k] = []
    } else {
      _o[k] = {}
    }
    _o = _o[k]
  })

  return o
}
