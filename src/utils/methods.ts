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
