export interface StorageConfig {
  /** 数据版本号，读取时版本不一致的数据会被自动删除 */
  version: number
  /** key 前缀，clear 时只清理带此前缀的 key，避免误清同域其他应用的数据 */
  prefix?: string
  /** 默认过期时长（毫秒），写入未单独指定 expires 时生效 */
  expires?: number
}

/** 实际写入 storage 的结构：业务值 + 写入时间与版本、过期等元信息 */
export interface StorageSetValue {
  value: any
  /** 写入时间戳（毫秒），配合 expires 计算是否过期 */
  time: number
  version: number
  /** 过期时长（毫秒） */
  expires?: number
}

export interface StorageSetOptions {
  /** 自定义写入时间戳（毫秒），缺省为当前时间 */
  time?: number
  /** 过期时长（毫秒），缺省回落 config.expires */
  expires?: number
}

const getTime = () => new Date().getTime()

/** 创建带前缀、版本、过期管理的 Storage 实例 */
export const createStorage = (
  storage: globalThis.Storage,
  config: StorageConfig
) => {
  const getKey = (key: string) =>
    config.prefix ? `${config.prefix}-${key}` : key

  const remove = (key: string) => storage.removeItem(getKey(key))

  /**
   * 清空存储：配置了 prefix 时只清理本应用前缀的 key，
   * 未配置 prefix 时清空整个 storage
   */
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

  /** 写入数据：连同写入时间、版本、过期信息一并序列化存储 */
  const set = (key: string, value: any, options?: StorageSetOptions) => {
    const data: StorageSetValue = {
      value,
      time: options?.time ?? getTime(),
      version: config.version,
      expires: options?.expires ?? config.expires
    }

    storage.setItem(getKey(key), JSON.stringify(data))
  }

  /** 读取数据：版本不一致、已过期或数据损坏时自动删除该 key 并返回 null */
  const get = <T = any>(key: string): Nullable<T> => {
    const data = storage.getItem(getKey(key))
    if (!data) return null

    try {
      const { version, time, expires, value } = JSON.parse(
        data
      ) as StorageSetValue

      if (
        version !== config.version ||
        (expires && getTime() - time > expires)
      ) {
        remove(key)
        return null
      }

      return value
    } catch {
      remove(key)
      return null
    }
  }

  /** key 是否存在且有效（未过期、版本一致） */
  const has = (key: string) => get(key) !== null

  return {
    set,
    get,
    has,
    remove,
    clear,

    /** 批量写入数据 */
    setData: (data: Record<string, any>, options?: StorageSetOptions) =>
      Object.entries(data).forEach(([key, value]) => set(key, value, options)),
    /** 批量移除数据 */
    removeKeys: (...keys: string[]) => keys.forEach((key) => remove(key))
  }
}
