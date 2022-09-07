import type { StorageConfig, StorageSetOptions, StorageSetData } from './types'

export class Storage {
  config: StorageConfig
  storage: globalThis.Storage
  constructor(config: StorageConfig) {
    this.config = config
    this.storage = window[config.type]
  }

  private _key(key: string) {
    if (this.config.prefix) {
      key = `${this.config.prefix}-${key}`
    }
    return key
  }

  private _expires(expires?: number) {
    return expires || this.config.expires
  }

  private get nowTime() {
    return new Date().getTime()
  }

  set(key: string, value: any, options?: StorageSetOptions) {
    const _key = this._key(key)

    const data: StorageSetData = {
      value,
      version: this.config.version,
      expires: this._expires(options?.expires),
      time: options?.time || this.nowTime
    }

    this.storage.setItem(_key, JSON.stringify(data))
  }

  has(key: string) {
    return !!this.storage.getItem(this._key(key))
  }

  get<T = any>(key: string): T | null {
    if (!this.has(key)) {
      return null
    }
    const data: StorageSetData = JSON.parse(
      this.storage.getItem(this._key(key))!
    )

    const { version, time, expires } = data

    // 版本不一 || 过期
    if (
      version !== this.config.version ||
      (expires && this.nowTime - time > expires)
    ) {
      this.remove(key)
      return null
    }

    return data.value
  }

  remove(key: string) {
    this.storage.removeItem(this._key(key))
  }

  clear() {
    this.storage.clear()
  }
}

export default Storage
