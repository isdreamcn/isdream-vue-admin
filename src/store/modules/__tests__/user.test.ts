import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../user'
import db from '@/storage'
import router, { routesHandler } from '@/router'
import { userLogin, getRoleMenu, getUserPermissions } from '@/api/user/login'

const { mockAppConfig, mockRouterStoreState } = vi.hoisted(() => ({
  mockAppConfig: {
    routesHandlerOptions: {
      setupRoutesType: 'roleMenu' as string,
      addRouteParentName: '__ROUTE_MAIN_NAME',
      flatRoutes: true
    },
    storeConfig: { userMenuStorage: false, userPermissionsStorage: false },
    serviceTokenConfig: { expires: 7 * 24 * 60 * 60 * 1000 },
    routerHistory: 'Hash' as 'Hash' | 'HTML5',
    routeMainName: '__ROUTE_MAIN_NAME',
    routeLoginName: '__ROUTE_LOGIN_NAME'
  },
  mockRouterStoreState: { setState: vi.fn() }
}))

vi.mock(import('@/config'), () => ({ appConfig: mockAppConfig }) as any)

vi.mock(
  import('@/storage'),
  () =>
    ({
      default: {
        get: vi.fn(),
        set: vi.fn(),
        setData: vi.fn(),
        removeKeys: vi.fn()
      }
    }) as any
)

vi.mock(
  import('@/router'),
  () =>
    ({
      default: { push: vi.fn(), replace: vi.fn() },
      routesHandler: { setupRoutes: vi.fn() }
    }) as any
)

vi.mock(
  import('@/api/user/login'),
  () =>
    ({
      userLogin: vi.fn(),
      getRoleMenu: vi.fn(),
      getUserPermissions: vi.fn()
    }) as any
)

vi.mock(
  import('../router'),
  () =>
    ({
      useRouterStore: vi.fn(() => mockRouterStoreState)
    }) as any
)

const mockReload = vi.fn()

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: { reload: mockReload, hash: '', pathname: '/', search: '' }
  })
})

beforeEach(() => {
  setActivePinia(createPinia())
  mockAppConfig.routesHandlerOptions.setupRoutesType = 'roleMenu'
  mockAppConfig.storeConfig.userMenuStorage = false
  mockAppConfig.storeConfig.userPermissionsStorage = false
  mockAppConfig.routerHistory = 'Hash'
})

describe('useUserStore', () => {
  describe('初始状态', () => {
    it('token 为空字符串', () => {
      const store = useUserStore()
      expect(store.token).toBe('')
    })

    it('userInfo 为 null', () => {
      const store = useUserStore()
      expect(store.userInfo).toBeNull()
    })

    it('roleMenu 为 null', () => {
      const store = useUserStore()
      expect(store.roleMenu).toBeNull()
    })

    it('userPermissions 为 null', () => {
      const store = useUserStore()
      expect(store.userPermissions).toBeNull()
    })
  })

  describe('userPermissionMap getter', () => {
    it('userPermissions 为 null 时返回空 Map', () => {
      const store = useUserStore()
      expect(store.userPermissionMap).toEqual(new Map())
    })

    it('将 userPermissions 数组转为 Map<string, boolean>', () => {
      const store = useUserStore()
      store.$patch({ userPermissions: ['edit', 'delete'] })
      const map = store.userPermissionMap
      expect(map.get('edit')).toBe(true)
      expect(map.get('delete')).toBe(true)
      expect(map.get('view')).toBeUndefined()
    })

    it('userPermissions 为空数组时返回空 Map', () => {
      const store = useUserStore()
      store.$patch({ userPermissions: [] })
      expect(store.userPermissionMap).toEqual(new Map())
    })
  })

  describe('setupState — roleMenu 模式', () => {
    it('从 db 恢复 token', async () => {
      vi.mocked(db.get).mockImplementation((key: string) => {
        if (key === 'token') return 'restored-token'
        return undefined
      })
      vi.mocked(getRoleMenu).mockResolvedValue({ data: [] })
      vi.mocked(getUserPermissions).mockResolvedValue({ data: [] })
      const store = useUserStore()
      await store.setupState()
      expect(store.token).toBe('restored-token')
    })

    it('从 db 恢复 userInfo', async () => {
      const mockUserInfo = { id: 1, username: 'admin' }
      vi.mocked(db.get).mockImplementation((key: string) => {
        if (key === 'token') return 'token'
        if (key === 'userInfo') return mockUserInfo
        return undefined
      })
      vi.mocked(getRoleMenu).mockResolvedValue({ data: [] })
      vi.mocked(getUserPermissions).mockResolvedValue({ data: [] })
      const store = useUserStore()
      await store.setupState()
      expect(store.userInfo).toEqual(mockUserInfo)
    })

    it('db 无 token 时直接 return，不调用 API', async () => {
      vi.mocked(db.get).mockReturnValue(undefined)
      const store = useUserStore()
      await store.setupState()
      expect(getRoleMenu).not.toHaveBeenCalled()
      expect(getUserPermissions).not.toHaveBeenCalled()
    })

    it('有 token 时调用 setUserMenu 加载菜单', async () => {
      vi.mocked(db.get).mockImplementation((key: string) => {
        if (key === 'token') return 'token'
        return undefined
      })
      vi.mocked(getRoleMenu).mockResolvedValue({ data: [] })
      vi.mocked(getUserPermissions).mockResolvedValue({ data: [] })
      const store = useUserStore()
      await store.setupState()
      expect(getRoleMenu).toHaveBeenCalled()
      expect(getUserPermissions).toHaveBeenCalled()
    })
  })

  describe('setUserMenu — roleMenu 模式', () => {
    it('并行调用 setUserPermissions 和 setRoleMenu', async () => {
      vi.mocked(getRoleMenu).mockResolvedValue({ data: [] })
      vi.mocked(getUserPermissions).mockResolvedValue({ data: [] })
      const store = useUserStore()
      await store.setUserMenu()
      expect(getRoleMenu).toHaveBeenCalled()
      expect(getUserPermissions).toHaveBeenCalled()
    })

    it('完成后调用 routesHandler.setupRoutes 传入 roleMenu 和 userPermissionMap', async () => {
      const mockMenu = [{ name: 'home', path: '/home', title: '首页' }]
      const mockPermissions = ['edit']
      vi.mocked(getRoleMenu).mockResolvedValue({ data: mockMenu })
      vi.mocked(getUserPermissions).mockResolvedValue({ data: mockPermissions })
      const store = useUserStore()
      await store.setUserMenu()
      expect(routesHandler.setupRoutes).toHaveBeenCalledWith(
        mockMenu,
        expect.any(Map)
      )
      const permMap = vi.mocked(routesHandler.setupRoutes).mock
        .calls[0][1] as Map<string, boolean>
      expect(permMap.get('edit')).toBe(true)
    })
  })

  describe('setupState — all 模式', () => {
    let useUserStoreAll: typeof useUserStore

    beforeAll(async () => {
      mockAppConfig.routesHandlerOptions.setupRoutesType = 'all'
      vi.resetModules()
      const mod = await import('../user')
      useUserStoreAll = mod.useUserStore
    })

    afterAll(() => {
      mockAppConfig.routesHandlerOptions.setupRoutesType = 'roleMenu'
    })

    beforeEach(() => {
      setActivePinia(createPinia())
    })

    it('setupState 时直接调用 routesHandler.setupRoutes()', async () => {
      vi.mocked(db.get).mockReturnValue(undefined)
      const store = useUserStoreAll()
      await store.setupState()
      expect(routesHandler.setupRoutes).toHaveBeenCalled()
    })
  })

  describe('setRoleMenu', () => {
    it('调用 getRoleMenu API 并存储结果到 this.roleMenu', async () => {
      const mockMenu = [{ name: 'home', path: '/home', title: '首页' }]
      vi.mocked(getRoleMenu).mockResolvedValue({ data: mockMenu })
      const store = useUserStore()
      await store.setRoleMenu()
      expect(getRoleMenu).toHaveBeenCalled()
      expect(store.roleMenu).toEqual(mockMenu)
    })

    it('API 返回空数组时不存储', async () => {
      vi.mocked(getRoleMenu).mockResolvedValue({ data: [] })
      const store = useUserStore()
      const result = await store.setRoleMenu()
      expect(store.roleMenu).toBeNull()
      expect(result.data).toEqual([])
    })

    it('userMenuStorage=true 且 db 有缓存时，使用缓存不调用 API', async () => {
      const cachedMenu = [{ name: 'cached', path: '/cached', title: '缓存' }]
      mockAppConfig.storeConfig.userMenuStorage = true
      vi.mocked(db.get).mockImplementation((key: string) => {
        if (key === 'roleMenu') return cachedMenu
        return undefined
      })
      const store = useUserStore()
      await store.setRoleMenu()
      expect(getRoleMenu).not.toHaveBeenCalled()
      expect(store.roleMenu).toEqual(cachedMenu)
    })

    it('userMenuStorage=true 且 db 无缓存时，调用 API 并写入 db.set', async () => {
      const apiMenu = [{ name: 'api', path: '/api', title: 'API菜单' }]
      mockAppConfig.storeConfig.userMenuStorage = true
      vi.mocked(db.get).mockReturnValue(undefined)
      vi.mocked(getRoleMenu).mockResolvedValue({ data: apiMenu })
      const store = useUserStore()
      await store.setRoleMenu()
      expect(getRoleMenu).toHaveBeenCalled()
      expect(db.set).toHaveBeenCalledWith('roleMenu', apiMenu)
      expect(store.roleMenu).toEqual(apiMenu)
    })
  })

  describe('setUserPermissions', () => {
    it('调用 getUserPermissions API 并存储结果', async () => {
      const mockPerms = ['edit', 'delete']
      vi.mocked(getUserPermissions).mockResolvedValue({ data: mockPerms })
      const store = useUserStore()
      await store.setUserPermissions()
      expect(getUserPermissions).toHaveBeenCalled()
      expect(store.userPermissions).toEqual(mockPerms)
    })

    it('userPermissionsStorage=true 且 db 有缓存时，使用缓存', async () => {
      const cachedPerms = ['cached_perm']
      mockAppConfig.storeConfig.userPermissionsStorage = true
      vi.mocked(db.get).mockImplementation((key: string) => {
        if (key === 'userPermissions') return cachedPerms
        return undefined
      })
      const store = useUserStore()
      await store.setUserPermissions()
      expect(getUserPermissions).not.toHaveBeenCalled()
      expect(store.userPermissions).toEqual(cachedPerms)
    })

    it('userPermissionsStorage=true 且 db 无缓存时，调用 API 并写入 db.set', async () => {
      const apiPerms = ['api_perm']
      mockAppConfig.storeConfig.userPermissionsStorage = true
      vi.mocked(db.get).mockReturnValue(undefined)
      vi.mocked(getUserPermissions).mockResolvedValue({ data: apiPerms })
      const store = useUserStore()
      await store.setUserPermissions()
      expect(getUserPermissions).toHaveBeenCalled()
      expect(db.set).toHaveBeenCalledWith('userPermissions', apiPerms)
      expect(store.userPermissions).toEqual(apiPerms)
    })
  })

  describe('loginHandler', () => {
    it('设置 token 和 userInfo', async () => {
      vi.mocked(getRoleMenu).mockResolvedValue({ data: [] })
      vi.mocked(getUserPermissions).mockResolvedValue({ data: [] })
      vi.mocked(router.push).mockResolvedValue(undefined)
      const store = useUserStore()
      await store.loginHandler({
        token: 'new-token',
        user: { id: 1, username: 'admin' }
      })
      expect(store.token).toBe('new-token')
      expect(store.userInfo).toEqual({ id: 1, username: 'admin' })
    })

    it('调用 setUserMenu 加载菜单', async () => {
      vi.mocked(getRoleMenu).mockResolvedValue({ data: [] })
      vi.mocked(getUserPermissions).mockResolvedValue({ data: [] })
      vi.mocked(router.push).mockResolvedValue(undefined)
      const store = useUserStore()
      await store.loginHandler({
        token: 'new-token',
        user: { username: 'admin' }
      })
      expect(getRoleMenu).toHaveBeenCalled()
      expect(getUserPermissions).toHaveBeenCalled()
    })

    it('跳转到主页面 router.push', async () => {
      vi.mocked(getRoleMenu).mockResolvedValue({ data: [] })
      vi.mocked(getUserPermissions).mockResolvedValue({ data: [] })
      vi.mocked(router.push).mockResolvedValue(undefined)
      const store = useUserStore()
      await store.loginHandler({
        token: 'new-token',
        user: { username: 'admin' }
      })
      expect(router.push).toHaveBeenCalledWith({ name: '__ROUTE_MAIN_NAME' })
    })
  })

  describe('login', () => {
    it('调用 userLogin API 传入参数', async () => {
      vi.mocked(userLogin).mockResolvedValue({
        data: { token: 't', user: { username: 'admin' } }
      })
      vi.mocked(getRoleMenu).mockResolvedValue({ data: [] })
      vi.mocked(getUserPermissions).mockResolvedValue({ data: [] })
      vi.mocked(router.push).mockResolvedValue(undefined)
      const store = useUserStore()
      await store.login({ username: 'admin', password: '123' })
      expect(userLogin).toHaveBeenCalledWith({
        username: 'admin',
        password: '123'
      })
    })

    it('成功后调用 loginHandler', async () => {
      const loginData = { token: 't', user: { username: 'admin' } }
      vi.mocked(userLogin).mockResolvedValue({ data: loginData })
      vi.mocked(getRoleMenu).mockResolvedValue({ data: [] })
      vi.mocked(getUserPermissions).mockResolvedValue({ data: [] })
      vi.mocked(router.push).mockResolvedValue(undefined)
      const store = useUserStore()
      const spy = vi.spyOn(store, 'loginHandler')
      await store.login({ username: 'admin', password: '123' })
      expect(spy).toHaveBeenCalledWith(loginData)
    })
  })

  describe('logout', () => {
    it('清除 db 中的 token/userInfo/userPermissions/roleMenu', async () => {
      const store = useUserStore()
      await store.logout()
      expect(db.removeKeys).toHaveBeenCalledWith(
        'token',
        'userInfo',
        'userPermissions',
        'roleMenu'
      )
    })

    it('跳转到登录页', async () => {
      const store = useUserStore()
      await store.logout()
      expect(router.push).toHaveBeenCalledWith({ name: '__ROUTE_LOGIN_NAME' })
    })

    it('调用 location.reload', async () => {
      const store = useUserStore()
      await store.logout()
      expect(mockReload).toHaveBeenCalled()
    })
  })

  describe('setState', () => {
    it('使用 $patch 更新 state', () => {
      const store = useUserStore()
      store.setState({ token: 'patched-token' })
      expect(store.token).toBe('patched-token')
    })

    it('传入 dbOptions 时调用 db.setData', () => {
      const store = useUserStore()
      const dbOptions = { expires: 1000 }
      store.setState({ token: 'patched-token' }, dbOptions)
      expect(db.setData).toHaveBeenCalledWith(
        { token: 'patched-token' },
        dbOptions
      )
    })

    it('不传 dbOptions 时不调用 db.setData', () => {
      const store = useUserStore()
      store.setState({ token: 'patched-token' })
      expect(db.setData).not.toHaveBeenCalled()
    })
  })

  describe('setToken', () => {
    it('设置 token 并调用 db.set', () => {
      const store = useUserStore()
      store.setToken('my-token')
      expect(store.token).toBe('my-token')
      expect(db.set).toHaveBeenCalledWith('token', 'my-token', undefined)
    })

    it('传入 dbOptions 时传递给 db.set', () => {
      const store = useUserStore()
      const dbOptions = { expires: 5000 }
      store.setToken('my-token', dbOptions)
      expect(db.set).toHaveBeenCalledWith('token', 'my-token', dbOptions)
    })
  })

  describe('setUserInfo', () => {
    it('设置 userInfo 并调用 db.set', () => {
      const store = useUserStore()
      const info = { id: 1, username: 'admin' }
      store.setUserInfo(info)
      expect(store.userInfo).toEqual(info)
      expect(db.set).toHaveBeenCalledWith('userInfo', info, undefined)
    })
  })

  describe('permissionAuth', () => {
    it('有权限时返回 true', () => {
      const store = useUserStore()
      store.$patch({ userPermissions: ['edit', 'delete'] })
      expect(store.permissionAuth('edit')).toBe(true)
    })

    it('无权限时返回 false', () => {
      const store = useUserStore()
      store.$patch({ userPermissions: ['edit'] })
      expect(store.permissionAuth('delete')).toBe(false)
    })

    it('userPermissions 为 null 时返回 false', () => {
      const store = useUserStore()
      expect(store.permissionAuth('any')).toBe(false)
    })
  })

  describe('reloadCurrentPage', () => {
    it('设置 routerStore loading 状态', async () => {
      const store = useUserStore()
      const promise = Promise.resolve()
      await store.reloadCurrentPage(promise)
      expect(mockRouterStoreState.setState).toHaveBeenCalledWith({
        loading: true,
        closeLoading: false
      })
    })

    it('promise 完成后调用 router.replace force:true', async () => {
      const store = useUserStore()
      const promise = Promise.resolve()
      vi.mocked(router.replace).mockResolvedValue(undefined)
      await store.reloadCurrentPage(promise)
      expect(router.replace).toHaveBeenCalledWith(
        expect.objectContaining({ force: true })
      )
    })

    it('完成后恢复 routerStore loading 状态', async () => {
      const store = useUserStore()
      const promise = Promise.resolve()
      vi.mocked(router.replace).mockResolvedValue(undefined)
      await store.reloadCurrentPage(promise)
      expect(mockRouterStoreState.setState).toHaveBeenCalledWith({
        loading: false,
        closeLoading: true
      })
    })
  })

  describe('getRouteLocationRaw — Hash 模式', () => {
    it('正确解析 #/path?query#hash', async () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          reload: mockReload,
          hash: '#/dashboard?page=1#section',
          pathname: '/',
          search: ''
        }
      })
      vi.mocked(router.replace).mockResolvedValue(undefined)
      const store = useUserStore()
      await store.reloadCurrentPage(Promise.resolve())
      const call = vi.mocked(router.replace).mock.calls[0][0] as any
      expect(call.path).toBe('/dashboard')
      expect(call.query).toEqual({ page: '1' })
      expect(call.hash).toBe('#section')
      expect(call.force).toBe(true)
    })

    it('无 query 无 hash 时返回空值', async () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          reload: mockReload,
          hash: '#/dashboard',
          pathname: '/',
          search: ''
        }
      })
      vi.mocked(router.replace).mockResolvedValue(undefined)
      const store = useUserStore()
      await store.reloadCurrentPage(Promise.resolve())
      const call = vi.mocked(router.replace).mock.calls[0][0] as any
      expect(call.path).toBe('/dashboard')
      expect(call.query).toEqual({})
      expect(call.hash).toBe('')
    })

    it('多个相同 key 的 query 参数转为数组', async () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          reload: mockReload,
          hash: '#/list?tag=a&tag=b&tag=c',
          pathname: '/',
          search: ''
        }
      })
      vi.mocked(router.replace).mockResolvedValue(undefined)
      const store = useUserStore()
      await store.reloadCurrentPage(Promise.resolve())
      const call = vi.mocked(router.replace).mock.calls[0][0] as any
      expect(call.query).toEqual({ tag: ['a', 'b', 'c'] })
    })
  })

  describe('getRouteLocationRaw — HTML5 模式', () => {
    beforeEach(() => {
      mockAppConfig.routerHistory = 'HTML5'
    })

    it('正确解析 pathname + search + hash', async () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          reload: mockReload,
          hash: '#section',
          pathname: '/dashboard',
          search: '?page=1'
        }
      })
      vi.mocked(router.replace).mockResolvedValue(undefined)
      const store = useUserStore()
      await store.reloadCurrentPage(Promise.resolve())
      const call = vi.mocked(router.replace).mock.calls[0][0] as any
      expect(call.path).toBe('/dashboard')
      expect(call.query).toEqual({ page: '1' })
      expect(call.hash).toBe('#section')
    })

    it('pathname 为空时默认 /', async () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          reload: mockReload,
          hash: '',
          pathname: '',
          search: ''
        }
      })
      vi.mocked(router.replace).mockResolvedValue(undefined)
      const store = useUserStore()
      await store.reloadCurrentPage(Promise.resolve())
      const call = vi.mocked(router.replace).mock.calls[0][0] as any
      expect(call.path).toBe('/')
    })
  })
})
