import { createPinia, setActivePinia } from 'pinia'
import { useRouterStore, useRouteMainPath } from '../router'

describe('useRouterStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('初始状态', () => {
    it('keepAliveMap 为空 Map', () => {
      const store = useRouterStore()
      expect(store.keepAliveMap).toBeInstanceOf(Map)
      expect(store.keepAliveMap.size).toBe(0)
    })

    it('routeHistoryMap 为空 Map', () => {
      const store = useRouterStore()
      expect(store.routeHistoryMap).toBeInstanceOf(Map)
      expect(store.routeHistoryMap.size).toBe(0)
    })

    it('needLoading 为 false', () => {
      const store = useRouterStore()
      expect(store.needLoading).toBe(false)
    })

    it('closeLoading 为 true', () => {
      const store = useRouterStore()
      expect(store.closeLoading).toBe(true)
    })

    it('loading 为 false', () => {
      const store = useRouterStore()
      expect(store.loading).toBe(false)
    })
  })

  describe('routeHistory getter', () => {
    it('空 Map 返回空数组', () => {
      const store = useRouterStore()
      expect(store.routeHistory).toEqual([])
    })

    it('返回 routeHistoryMap 所有 value 组成的数组', () => {
      const store = useRouterStore()
      const item1 = { path: '/a', meta: {} }
      const item2 = { path: '/b', meta: {} }
      store.routeHistoryMap.set('/a', item1)
      store.routeHistoryMap.set('/b', item2)
      expect(store.routeHistory).toEqual([item1, item2])
    })
  })

  describe('setupState', () => {
    it('调用不报错（空函数）', () => {
      const store = useRouterStore()
      expect(() => store.setupState()).not.toThrow()
    })
  })

  describe('setState — loading 锁定保护', () => {
    it('非 loading 状态下正常 patch', () => {
      const store = useRouterStore()
      store.setState({ needLoading: true })
      expect(store.needLoading).toBe(true)
    })

    it('loading=true + closeLoading=false + state 不含 closeLoading 时，强制 state.loading=true', () => {
      const store = useRouterStore()
      store.$patch({ loading: true, closeLoading: false })
      store.setState({ needLoading: true })
      expect(store.loading).toBe(true)
    })

    it('loading=true + closeLoading=false + state 含 closeLoading=true 时，正常 patch', () => {
      const store = useRouterStore()
      store.$patch({ loading: true, closeLoading: false })
      store.setState({ closeLoading: true, loading: false })
      expect(store.loading).toBe(false)
      expect(store.closeLoading).toBe(true)
    })

    it('loading=false 时，正常 patch', () => {
      const store = useRouterStore()
      store.$patch({ loading: false })
      store.setState({ loading: false })
      expect(store.loading).toBe(false)
    })
  })

  describe('getAlive', () => {
    it('不存在的 key 返回空数组', () => {
      const store = useRouterStore()
      expect(store.getAlive('/not-exist')).toEqual([])
    })

    it('返回指定 path 的 Set 展开数组', () => {
      const store = useRouterStore()
      store.keepAliveMap.set('/home', new Set(['HomeView']))
      expect(store.getAlive('/home')).toEqual(['HomeView'])
    })

    it('多个组件名称全部返回', () => {
      const store = useRouterStore()
      store.keepAliveMap.set('/home', new Set(['CompA', 'CompB', 'CompC']))
      expect(store.getAlive('/home')).toEqual(['CompA', 'CompB', 'CompC'])
    })
  })

  describe('addAlive', () => {
    it('path 不存在时创建新 Set 并添加 name', () => {
      const store = useRouterStore()
      store.addAlive('/home', 'HomeView')
      expect(store.keepAliveMap.get('/home')).toBeInstanceOf(Set)
      expect(store.keepAliveMap.get('/home')!.has('HomeView')).toBe(true)
    })

    it('path 已存在时添加新 name 到 Set', () => {
      const store = useRouterStore()
      store.addAlive('/home', 'CompA')
      store.addAlive('/home', 'CompB')
      expect(store.keepAliveMap.get('/home')!.size).toBe(2)
      expect(store.keepAliveMap.get('/home')!.has('CompA')).toBe(true)
      expect(store.keepAliveMap.get('/home')!.has('CompB')).toBe(true)
    })

    it('重复添加相同 name 不会增加 Set 大小（去重）', () => {
      const store = useRouterStore()
      store.addAlive('/home', 'HomeView')
      store.addAlive('/home', 'HomeView')
      expect(store.keepAliveMap.get('/home')!.size).toBe(1)
    })
  })

  describe('addRouteHistory', () => {
    it('添加新路由到 routeHistoryMap', () => {
      const store = useRouterStore()
      const item = { path: '/home', meta: {} }
      store.addRouteHistory(item)
      expect(store.routeHistoryMap.get('/home')).toEqual(item)
    })

    it('重复 path 不覆盖（去重）', () => {
      const store = useRouterStore()
      const item1 = { path: '/home', meta: { title: 'first' } }
      const item2 = { path: '/home', meta: { title: 'second' } }
      store.addRouteHistory(item1)
      store.addRouteHistory(item2)
      expect(store.routeHistoryMap.get('/home')).toEqual(item1)
    })
  })

  describe('deleteRouteHistory', () => {
    it('删除已存在的路由', () => {
      const store = useRouterStore()
      const item = { path: '/home', meta: {} }
      store.routeHistoryMap.set('/home', item)
      store.deleteRouteHistory('/home')
      expect(store.routeHistoryMap.has('/home')).toBe(false)
    })

    it('删除不存在的路由不报错', () => {
      const store = useRouterStore()
      expect(() => store.deleteRouteHistory('/not-exist')).not.toThrow()
    })
  })

  describe('clearRouteHistory', () => {
    it('清空所有路由历史', () => {
      const store = useRouterStore()
      store.routeHistoryMap.set('/a', { path: '/a', meta: {} })
      store.routeHistoryMap.set('/b', { path: '/b', meta: {} })
      store.clearRouteHistory()
      expect(store.routeHistoryMap.size).toBe(0)
    })
  })
})

describe('useRouteMainPath', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('routeHistory 为空时返回 undefined', () => {
    const mainPath = useRouteMainPath()
    expect(mainPath.value).toBeUndefined()
  })

  it('返回 routeHistory 第一项的 path', () => {
    const store = useRouterStore()
    store.routeHistoryMap.set('/home', { path: '/home', meta: {} })
    store.routeHistoryMap.set('/about', { path: '/about', meta: {} })
    const mainPath = useRouteMainPath()
    expect(mainPath.value).toBe('/home')
  })

  it('是 computed，响应 routeHistory 变化', () => {
    const store = useRouterStore()
    const mainPath = useRouteMainPath()
    expect(mainPath.value).toBeUndefined()
    store.routeHistoryMap.set('/dashboard', { path: '/dashboard', meta: {} })
    expect(mainPath.value).toBe('/dashboard')
  })
})
