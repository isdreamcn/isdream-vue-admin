import { ElMessage } from 'element-plus'

// 组合函数
type ComposeFn<T = any, R = T> = (payload: T) => R

export const composeFns = <T = any>(
  ...fns: ComposeFn<T, T | false>[]
): ComposeFn<T> => {
  const length = fns.length

  return (payload) => {
    let result = length ? fns[0](payload) : payload
    if (result === false) {
      return payload
    }
    let index = 0
    while (++index < length) {
      result = fns[index](result)
      if (result === false) {
        return payload
      }
    }

    return result
  }
}

export const wrapperImportMetaEnv = (env: ImportMetaEnv): ViteEnv => {
  return {
    ...env,
    VITE_USE_MOCK: env.VITE_USE_MOCK === 'true' ? true : false
  }
}

type verifyObjTip = Record<
  string,
  string | ((val?: any, key?: string) => string | void)
>

export const verifyObj = (
  tip: verifyObjTip,
  obj: Record<string, any>,
  verifyFn = (val: any) => (val ?? false) !== false
): boolean => {
  for (const key of Object.keys(tip)) {
    const val = tip[key]
    if (typeof val === 'function') {
      const res = val(obj[key], key)
      if (res) {
        ElMessage.info(res)
        return false
      }
    } else {
      if (!verifyFn(obj[key])) {
        ElMessage.info(val)
        return false
      }
    }
  }
  return true
}
