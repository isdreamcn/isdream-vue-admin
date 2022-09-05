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
