import { ElMessage } from 'element-plus'
import { isArray, isObject, hasOwn, cloneDeep } from './plugins'

interface MergeObjOptions {
  deep: boolean
  /** 是否用 obj2 的值覆盖 obj1 的原值，返回 false 跳过该键 */
  overlayable: (
    val: any,
    key: string | number | symbol,
    obj1: object,
    obj2: object
  ) => boolean
}

/**
 * 创建对象合并函数，合并行为由 options 控制
 * （返回合并后的新对象，不修改原对象）
 */
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

/** 深度合并两个对象：同名属性总是覆盖，嵌套对象递归合并 */
export const mergeObjDeep = createMergeObjFn({
  deep: true,
  overlayable: () => true
})

/** 按路径字符串从对象中取值，支持 'a.b.c' 与 'a[0].b' 两种写法 */
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

/**
 * 按路径字符串生成嵌套对象，将值挂到最内层
 * ('a.b.c', 5) => { a: { b: { c: 5 } } }
 * ('[0].a', 5) => [{ a: 5 }]
 */
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

/**
 * 修改对象的 key：将 keys 映射中旧 key 的值赋给新 key（旧 key 保留）
 * 递归处理数组元素与 childKey 指定的子级，返回深拷贝结果
 * keys 为新旧 key 映射，如 { id: 'userId' } 表示 o.id = o.userId
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

/** 校验提示：值为提示文案，或返回提示文案（校验失败）/空（通过）的校验函数 */
type VerifyObjTip = Record<
  string,
  string | ((val?: any, key?: string) => string | void)
>

/**
 * 校验对象：逐项校验 obj 中的字段，失败时提示并中断
 * tip 值为函数时走自定义校验（返回字符串即失败并提示），
 * 否则用 verifyFn 校验对应字段，失败时提示 tip 中的文案
 * （verifyFn 缺省为 (val ?? false) !== false，null/undefined/false 视为未通过）
 */
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

type ComposeFn<T = any> = (payload: T) => T
type ComposePause<T = any> = (result: T) => boolean

/**
 * 组合多个函数为一条管道：依次执行，前一函数的返回值作为下一函数的入参
 * pause 返回 true 时终止后续函数并直接返回该结果
 */
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
