/*
 * @Description:
 * @Author: mtm
 * @Date: 2022-09-04 13:22:15
 * @LastEditTime: 2022-09-04 14:17:12
 * @LastEditors: mtm
 */
export type NativePropType =
  | ((...args: any) => any)
  | { new (...args: any): any }
  | undefined
  | null

export type PropInput<Type = any> = {
  type?: Type
  required?: boolean
  values?: readonly Type[]
  validator?: (val: any) => boolean
  default?: Type
}

export type Prop<Type = any> = {
  type?: Type
  required?: boolean
  validator?: (val: any) => boolean
  default?: Type
}
