export interface StorageConfig {
  version: number
  prefix?: string
  expires?: number
}

export interface StorageSetValue {
  value: any
  time: number
  version: number
  expires?: number
}

export interface StorageSetOptions {
  time?: number
  expires?: number
}

const getTime = () => new Date().getTime()

export const createStorage = (
  storage: globalThis.Storage,
  config: StorageConfig
) => {
  const getKey = (key: string) =>
    config.prefix ? `${config.prefix}-${key}` : key

  const remove = (key: string) => storage.removeItem(getKey(key))
  const clear = () => storage.clear()

  const set = (key: string, value: any, options?: StorageSetOptions) => {
    const data: StorageSetValue = {
      value,
      time: options?.time ?? getTime(),
      version: config.version,
      expires: options?.expires ?? config.expires
    }

    storage.setItem(getKey(key), JSON.stringify(data))
  }

  const get = <T = any>(key: string): Nullable<T> => {
    const data = storage.getItem(getKey(key))
    if (!data) return null

    const { version, time, expires, value } = JSON.parse(
      data
    ) as StorageSetValue

    // 版本不一 || 过期
    if (version !== config.version || (expires && getTime() - time > expires)) {
      remove(key)
      return null
    }

    return value
  }

  const has = (key: string) => get(key) !== null

  return {
    set,
    get,
    has,
    remove,
    clear,

    // 批量设置数据
    setData: (data: Record<string, any>, options?: StorageSetOptions) =>
      Object.entries(data).forEach(([key, value]) => set(key, value, options)),
    // 批量移除数据
    removeKeys: (...keys: string[]) => keys.forEach((key) => remove(key))
  }
}
