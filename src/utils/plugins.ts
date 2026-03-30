import { isFunction } from 'lodash-unified'

export { warn, isVNode } from 'vue'

export {
  isArray,
  isFunction,
  isString,
  isDate,
  isSymbol,
  cloneDeep,
  clone,
  isNumber,
  uniqueId,
  debounce,
  isUndefined,
  isNil,
  isBoolean,
  fromPairs
} from 'lodash-unified'

const hasOwnProperty = Object.prototype.hasOwnProperty
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key)

export const NOOP = (): void => {}

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return (
    (isObject(val) || isFunction(val)) &&
    isFunction((val as any).then) &&
    isFunction((val as any).catch)
  )
}
