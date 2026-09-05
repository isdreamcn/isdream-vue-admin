import { isNil, isArray, isObject } from './plugins'

/** 判断值是否为空：假值（0 除外）、空数组、空对象均视为空 */
export const isEmpty = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length)

/** 判断是否为 DOM 元素，无 DOM 环境（如 SSR）时返回 false */
export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false
  return e instanceof Element
}

/** 判断 prop 是否未传递（仅 null/undefined；0、''、false 均视为已传递） */
export const isPropAbsent = (prop: unknown): prop is null | undefined => {
  return isNil(prop)
}

export const isImageByExtname = (str: string) => {
  const reg = /\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|tif|ico|avif|apng)$/i
  return reg.test(str)
}
