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

  const clear = () => {
    if (!config.prefix) {
      storage.clear()
      return
    }
    const keysToRemove: string[] = []
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i)
      if (key && key.startsWith(`${config.prefix}-`)) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach((key) => storage.removeItem(key))
  }

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

    try {
      const { version, time, expires, value } = JSON.parse(
        data
      ) as StorageSetValue

      // 版本不一致 || 已过期
      if (
        version !== config.version ||
        (expires && getTime() - time > expires)
      ) {
        remove(key)
        return null
      }

      return value
    } catch {
      // 数据损坏时自动删除
      remove(key)
      return null
    }
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
