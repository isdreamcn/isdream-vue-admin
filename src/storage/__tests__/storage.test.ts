import { createStorage } from '../storage'
import type { StorageConfig } from '../storage'

function createMockStorage(): Storage {
  const store = new Map<string, string>()
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value)
    },
    removeItem: (key: string) => {
      store.delete(key)
    },
    clear: () => store.clear(),
    get length() {
      return store.size
    },
    key: (index: number) => {
      const keys = Array.from(store.keys())
      return keys[index] ?? null
    }
  }
}

function createStorageConfig(
  overrides?: Partial<StorageConfig>
): StorageConfig {
  return { version: 1, ...overrides }
}

describe('createStorage', () => {
  describe('前缀拼接', () => {
    it('有 prefix 时 key 被拼接为 prefix-key 格式', () => {
      const storage = createMockStorage()
      const store = createStorage(
        storage,
        createStorageConfig({ prefix: 'app' })
      )
      store.set('name', 'Alice')
      expect(storage.getItem('app-name')).not.toBeNull()
      expect(JSON.parse(storage.getItem('app-name')!).value).toBe('Alice')
    })

    it('无 prefix 时 key 保持原样', () => {
      const storage = createMockStorage()
      const store = createStorage(storage, createStorageConfig())
      store.set('name', 'Bob')
      expect(storage.getItem('name')).not.toBeNull()
      expect(JSON.parse(storage.getItem('name')!).value).toBe('Bob')
    })
  })

  describe('set', () => {
    it('不传 options 时使用默认值写入 storage', () => {
      const storage = createMockStorage()
      const store = createStorage(
        storage,
        createStorageConfig({ expires: 1000 })
      )
      store.set('k', 'v')

      const raw = JSON.parse(storage.getItem('k')!)
      expect(raw.value).toBe('v')
      expect(raw.version).toBe(1)
      expect(raw.expires).toBe(1000)
      expect(raw.time).toBeTypeOf('number')
      expect(raw.time).toBeGreaterThan(0)
    })

    it('传入 options.time 时使用自定义时间', () => {
      const storage = createMockStorage()
      const store = createStorage(storage, createStorageConfig())
      store.set('k', 'v', { time: 12345 })

      const raw = JSON.parse(storage.getItem('k')!)
      expect(raw.time).toBe(12345)
    })

    it('传入 options.expires 时覆盖 config.expires', () => {
      const storage = createMockStorage()
      const store = createStorage(
        storage,
        createStorageConfig({ expires: 1000 })
      )
      store.set('k', 'v', { expires: 9999 })

      const raw = JSON.parse(storage.getItem('k')!)
      expect(raw.expires).toBe(9999)
    })

    it('value 可以是任意 JSON 可序列化的值', () => {
      const storage = createMockStorage()
      const store = createStorage(storage, createStorageConfig())

      store.set('obj', { a: 1 })
      store.set('arr', [1, 2])
      store.set('num', 42)
      store.set('bool', false)

      expect(JSON.parse(storage.getItem('obj')!).value).toEqual({ a: 1 })
      expect(JSON.parse(storage.getItem('arr')!).value).toEqual([1, 2])
      expect(JSON.parse(storage.getItem('num')!).value).toBe(42)
      expect(JSON.parse(storage.getItem('bool')!).value).toBe(false)
    })
  })

  describe('get', () => {
    beforeEach(() => vi.useFakeTimers())
    afterEach(() => vi.useRealTimers())

    it('key 不存在时返回 null', () => {
      const storage = createMockStorage()
      const store = createStorage(storage, createStorageConfig())
      expect(store.get('missing')).toBeNull()
    })

    it('存储值为空字符串时返回 null', () => {
      const storage = createMockStorage()
      storage.setItem('key', '')
      const store = createStorage(storage, createStorageConfig())
      expect(store.get('key')).toBeNull()
    })

    it('读取有效数据时返回 value', () => {
      const storage = createMockStorage()
      const store = createStorage(storage, createStorageConfig())
      store.set('name', 'Alice')
      expect(store.get('name')).toBe('Alice')
    })

    it('版本不匹配时自动删除并返回 null', () => {
      const storage = createMockStorage()
      // 手动写入 version=1 的数据
      storage.setItem(
        'k',
        JSON.stringify({ value: 'old', time: Date.now(), version: 1 })
      )

      const store = createStorage(storage, createStorageConfig({ version: 2 }))
      expect(store.get('k')).toBeNull()
      expect(storage.getItem('k')).toBeNull()
    })

    it('数据已过期时自动删除并返回 null', () => {
      const storage = createMockStorage()
      vi.setSystemTime(1000)

      const store = createStorage(storage, createStorageConfig())
      store.set('k', 'v', { time: 0, expires: 100 })

      vi.setSystemTime(2000)
      expect(store.get('k')).toBeNull()
      expect(storage.getItem('k')).toBeNull()
    })

    it('expires 为 undefined 时不进行过期检查', () => {
      const storage = createMockStorage()
      const store = createStorage(storage, createStorageConfig())
      store.set('k', 'v', { time: 0 })

      vi.setSystemTime(9999999999999)
      expect(store.get('k')).toBe('v')
    })

    it('数据损坏（无效 JSON）时自动删除并返回 null', () => {
      const storage = createMockStorage()
      storage.setItem('k', '{not valid json')
      const store = createStorage(storage, createStorageConfig())
      expect(store.get('k')).toBeNull()
      expect(storage.getItem('k')).toBeNull()
    })
  })

  describe('has', () => {
    it('key 存在且有效时返回 true', () => {
      const storage = createMockStorage()
      const store = createStorage(storage, createStorageConfig())
      store.set('k', 'v')
      expect(store.has('k')).toBe(true)
    })

    it('key 不存在时返回 false', () => {
      const storage = createMockStorage()
      const store = createStorage(storage, createStorageConfig())
      expect(store.has('missing')).toBe(false)
    })

    it('key 已过期时返回 false', () => {
      vi.useFakeTimers()
      const storage = createMockStorage()
      vi.setSystemTime(1000)

      const store = createStorage(storage, createStorageConfig())
      store.set('k', 'v', { time: 0, expires: 100 })

      vi.setSystemTime(2000)
      expect(store.has('k')).toBe(false)
      vi.useRealTimers()
    })
  })

  describe('remove', () => {
    it('从 storage 中移除指定 key', () => {
      const storage = createMockStorage()
      const store = createStorage(storage, createStorageConfig())
      store.set('a', 1)
      store.set('b', 2)
      store.remove('a')
      expect(store.get('a')).toBeNull()
      expect(store.get('b')).toBe(2)
    })
  })

  describe('clear', () => {
    it('无 prefix 时清空所有数据', () => {
      const storage = createMockStorage()
      const store = createStorage(storage, createStorageConfig())
      store.set('a', 1)
      store.set('b', 2)
      store.clear()
      expect(storage.length).toBe(0)
    })

    it('有 prefix 时只移除以 prefix- 开头的 key', () => {
      const storage = createMockStorage()
      storage.setItem('other', 'x')
      const store = createStorage(
        storage,
        createStorageConfig({ prefix: 'app' })
      )
      store.set('a', 1)
      store.set('b', 2)

      store.clear()
      expect(storage.getItem('other')).toBe('x')
      expect(storage.getItem('app-a')).toBeNull()
      expect(storage.getItem('app-b')).toBeNull()
    })

    it('有 prefix 但 storage 为空时不报错', () => {
      const storage = createMockStorage()
      const store = createStorage(
        storage,
        createStorageConfig({ prefix: 'app' })
      )
      expect(() => store.clear()).not.toThrow()
    })
  })

  describe('setData', () => {
    it('批量设置多个 key-value', () => {
      const storage = createMockStorage()
      const store = createStorage(storage, createStorageConfig())
      store.setData({ a: 1, b: 'two', c: { x: 3 } })
      expect(store.get('a')).toBe(1)
      expect(store.get('b')).toBe('two')
      expect(store.get('c')).toEqual({ x: 3 })
    })

    it('传入 options 时应用到每个 set', () => {
      const storage = createMockStorage()
      const store = createStorage(
        storage,
        createStorageConfig({ expires: 1000 })
      )
      store.setData({ a: 1, b: 2 }, { expires: 500 })

      const rawA = JSON.parse(storage.getItem('a')!)
      const rawB = JSON.parse(storage.getItem('b')!)
      expect(rawA.expires).toBe(500)
      expect(rawB.expires).toBe(500)
    })

    it('空对象不产生任何写入', () => {
      const storage = createMockStorage()
      const store = createStorage(storage, createStorageConfig())
      store.setData({})
      expect(storage.length).toBe(0)
    })
  })

  describe('removeKeys', () => {
    it('批量移除多个 key', () => {
      const storage = createMockStorage()
      const store = createStorage(storage, createStorageConfig())
      store.set('a', 1)
      store.set('b', 2)
      store.set('c', 3)
      store.removeKeys('a', 'c')
      expect(store.get('a')).toBeNull()
      expect(store.get('c')).toBeNull()
      expect(store.get('b')).toBe(2)
    })

    it('无参数时不报错', () => {
      const storage = createMockStorage()
      const store = createStorage(storage, createStorageConfig())
      expect(() => store.removeKeys()).not.toThrow()
    })
  })
})
