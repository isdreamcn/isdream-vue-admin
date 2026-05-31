const { mockConfig } = vi.hoisted(() => ({
  mockConfig: {
    storageConfig: {
      prefix: 'isdream',
      expires: 604800000,
      version: 1
    }
  }
}))

vi.mock(
  import('@/config'),
  () =>
    ({
      default: mockConfig,
      appConfig: mockConfig
    }) as any
)

import { db } from '../index'
import dbDefault from '../index'

describe('storage/index', () => {
  afterEach(() => {
    db.clear()
  })

  it('导出 db 对象包含所有存储方法', () => {
    expect(db).toBeDefined()
    expect(db.set).toBeTypeOf('function')
    expect(db.get).toBeTypeOf('function')
    expect(db.has).toBeTypeOf('function')
    expect(db.remove).toBeTypeOf('function')
    expect(db.clear).toBeTypeOf('function')
    expect(db.setData).toBeTypeOf('function')
    expect(db.removeKeys).toBeTypeOf('function')
  })

  it('db 使用 config.storageConfig 中的 prefix', () => {
    db.set('test', 'value')
    expect(db.get('test')).toBe('value')
    // 验证前缀：直接读取 localStorage 原始 key
    expect(window.localStorage.getItem('isdream-test')).not.toBeNull()
  })

  it('db 使用 config.storageConfig 中的 version', () => {
    db.set('test', 'value')
    const raw = JSON.parse(window.localStorage.getItem('isdream-test')!)
    expect(raw.version).toBe(1)
  })

  it('db 使用 config.storageConfig 中的 expires', () => {
    db.set('test', 'value')
    const raw = JSON.parse(window.localStorage.getItem('isdream-test')!)
    expect(raw.expires).toBe(604800000)
  })

  it('db 是默认导出和命名导出的同一引用', () => {
    expect(db).toBe(dbDefault)
  })
})
