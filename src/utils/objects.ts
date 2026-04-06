import { ElMessage } from 'element-plus'
import { isArray, isObject, hasOwn, cloneDeep } from './plugins'

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

export function getVal<T = any>(
  form: Record<string, any>,
  s: string
): T | undefined {
  if (!isObject(form)) {
    return
  }
  return s
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/^\./, '')
    .split('.')
    .reduce((prev: Record<string, any> | undefined, cur) => {
      if (prev && hasOwn(prev, cur)) {
        return prev[cur]
      }
    }, form) as T | undefined
}

// (a.b.c, 5) => { a: { b: { c: 5 } } }
// ([0].a, 5) => [{ a: 5 }]
export const generateObj = (key: string, val: any) => {
  // 数组标识分隔符，用于区分数组索引与普通属性键
  const ARRAY_KEY_SEPARATOR = '##'
  const separatorLen = ARRAY_KEY_SEPARATOR.length

  let _key = key
    .replace(/\[(\w+)\]/g, `${ARRAY_KEY_SEPARATOR}.$1`)
    .replace(/^\./, '')
  let o: Record<string | number, any> = {}
  if (_key.startsWith(ARRAY_KEY_SEPARATOR + '.')) {
    o = []
    _key = _key.slice(separatorLen + 1)
  }

  const keys = _key.split('.')
  let _o = o
  keys.forEach((k, index) => {
    if (index === keys.length - 1) {
      _o[k] = val
      return
    }
    if (k.endsWith(ARRAY_KEY_SEPARATOR)) {
      k = k.slice(0, 0 - separatorLen)
      _o[k] = []
    } else {
      _o[k] = {}
    }
    _o = _o[k]
  })

  return o
}

/*
 修改对象的key
*/
export const updateObjKeys = <T extends object = object>(
  obj: T,
  keys: Record<string, string>,
  childKey: string | false = false
) => {
  const _o = cloneDeep(obj)
  const fn = (o: any) => {
    if (isArray(o)) {
      o.forEach((item) => fn(item))
    } else if (isObject(o)) {
      Object.entries(keys).forEach(([newKey, oldKey]) => {
        o[newKey] = o[oldKey]
      })
      if (childKey) {
        fn(o[childKey])
      }
    }
  }
  fn(_o)
  return _o
}

type VerifyObjTip = Record<
  string,
  string | ((val?: any, key?: string) => string | void)
>
// 校验对象
export const verifyObj = (
  tip: VerifyObjTip,
  obj: Record<string, any>,
  verifyFn = (val: any) => (val ?? false) !== false,
  showMessage: ((msg: string) => void) | false = (msg: string) =>
    ElMessage.info(msg)
): boolean => {
  for (const key of Object.keys(tip)) {
    const val = tip[key]
    if (typeof val === 'function') {
      const res = val(obj[key], key)
      if (res) {
        if (showMessage) showMessage(res as string)
        return false
      }
    } else {
      if (!verifyFn(obj[key])) {
        if (showMessage) showMessage(val)
        return false
      }
    }
  }
  return true
}

// 组合函数
type ComposeFn<T = any> = (payload: T) => T
type ComposePause<T = any> = (result: T) => boolean

export const composeFns = <T = any>(
  fns: ComposeFn<T>[],
  pause?: ComposePause<T>
): ComposeFn<T> => {
  const length = fns.length

  return (payload) => {
    let result = payload
    let index = 0
    while (index < length) {
      result = fns[index++](result)
      if (pause && pause(result)) {
        return result
      }
    }

    return result
  }
}
