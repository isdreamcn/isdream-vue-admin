import { isNil, isArray, isObject } from './plugins'

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

export const isImageByExtname = (str: string) => {
  const reg = /\.(jpg|jpeg|png|gif|bmp|webp)$/i
  return reg.test(str)
}
