/*
 * @Description:
 * @Author: mtm
 * @Date: 2022-09-04 13:44:32
 * @LastEditTime: 2022-09-04 13:44:33
 * @LastEditors: mtm
 */
import { isArray, isObject } from '@vue/shared'
import { isNil } from 'lodash-unified'

export {
  isArray,
  isFunction,
  isObject,
  isString,
  isDate,
  isPromise,
  isSymbol
} from '@vue/shared'
export { isVNode } from 'vue'

export const isUndefined = (val: any): val is undefined => val === undefined

export const isEmpty = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length)

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false
  return e instanceof Element
}

export const isPropAbsent = (prop: unknown): prop is null | undefined => {
  return isNil(prop)
}
