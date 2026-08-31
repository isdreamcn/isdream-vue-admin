const {
  mockProcessRoutes,
  mockFlatRoutes,
  mockGenerRouteMap,
  mockGenerUserMenu,
  mockGenerRoutesByRoleMenu,
  mockGenerRoutesByPermissions,
  mockUseUserStore,
  mockUseRouterStore
} = vi.hoisted(() => ({
  mockProcessRoutes: vi.fn(),
  mockFlatRoutes: vi.fn(),
  mockGenerRouteMap: vi.fn(),
  mockGenerUserMenu: vi.fn(),
  mockGenerRoutesByRoleMenu: vi.fn(),
  mockGenerRoutesByPermissions: vi.fn(),
  mockUseUserStore: vi.fn(),
  mockUseRouterStore: vi.fn()
}))

vi.mock(
  import('../utils'),
  () =>
    ({
      processRoutes: mockProcessRoutes,
      flatRoutes: mockFlatRoutes,
      generRouteMap: mockGenerRouteMap,
      generUserMenu: mockGenerUserMenu,
      generRoutesByRoleMenu: mockGenerRoutesByRoleMenu,
      generRoutesByPermissions: mockGenerRoutesByPermissions
    }) as any
)

vi.mock(
  import('@/store'),
  () =>
    ({
      useUserStore: mockUseUserStore,
      useRouterStore: mockUseRouterStore
    }) as any
)

import { useRoutesHandler } from '../index'

function createMockRouter() {
  return {
    addRoute: vi.fn(() => vi.fn())
  } as any
}

describe('useRoutesHandler', () => {
  let mockRouter: ReturnType<typeof createMockRouter>
  let mockUserStore: { setState: ReturnType<typeof vi.fn> }
  let mockRouterStore: {
    clearRouteHistory: ReturnType<typeof vi.fn>
    addRouteHistory: ReturnType<typeof vi.fn>
  }

  const processedRoutes = [
    { path: '/dashboard', meta: { title: '首页' } },
    { path: '/about', meta: { title: '关于', hiddenInMenu: true } }
  ]

  beforeEach(() => {
    mockRouter = createMockRouter()
    mockUserStore = { setState: vi.fn() }
    mockRouterStore = { clearRouteHistory: vi.fn(), addRouteHistory: vi.fn() }

    mockUseUserStore.mockReturnValue(mockUserStore)
    mockUseRouterStore.mockReturnValue(mockRouterStore)
    mockProcessRoutes.mockReturnValue(processedRoutes)
    mockGenerRouteMap.mockReturnValue(new Map())
    mockGenerUserMenu.mockReturnValue([])
    mockFlatRoutes.mockImplementation((routes: any[]) => routes)
  })

  describe('构造', () => {
    it('调用 processRoutes 和 generRouteMap', () => {
      const originRoutes = [{ path: '/dashboard' }] as any[]

      useRoutesHandler(mockRouter, originRoutes, {
        setupRoutesType: 'all',
        flatRoutes: false
      })

      expect(mockProcessRoutes).toHaveBeenCalledWith(originRoutes)
      expect(mockGenerRouteMap).toHaveBeenCalledWith(processedRoutes)
    })

    it('getRouteByPath 返回 routeMap 中的数据', () => {
      const routeData = { route: { path: '/dashboard' } }
      const routeMap = new Map<string, any>([['/dashboard', routeData]])
      mockGenerRouteMap.mockReturnValue(routeMap)

      const { getRouteByPath, setupRoutes } = useRoutesHandler(
        mockRouter,
        [] as any[],
        {
          setupRoutesType: 'all',
          flatRoutes: false
        }
      )

      // getRouteByPath 使用的是 setupRoutes 中设置的 routeMap
      // 未调用 setupRoutes 前，routeMap 为空
      expect(getRouteByPath('/dashboard')).toBeUndefined()

      setupRoutes()
      expect(getRouteByPath('/dashboard')).toBe(routeData)
      expect(getRouteByPath('/not-exist')).toBeUndefined()
    })
  })

  describe('setupRoutes — all 模式', () => {
    it('使用 _originRoutes 注册路由', () => {
      mockGenerRouteMap.mockReturnValue(
        new Map<string, any>([
          ['/dashboard', { route: { path: '/dashboard', meta: {} } }],
          [
            '/about',
            { route: { path: '/about', meta: { hiddenInMenu: true } } }
          ]
        ])
      )
      mockGenerUserMenu.mockReturnValue([{ path: '/dashboard', title: '首页' }])

      const { setupRoutes } = useRoutesHandler(
        mockRouter,
        processedRoutes as any[],
        {
          setupRoutesType: 'all',
          flatRoutes: false
        }
      )

      setupRoutes()

      expect(mockRouter.addRoute).toHaveBeenCalledTimes(2)
      expect(mockUserStore.setState).toHaveBeenCalledWith({
        userMenu: [{ path: '/dashboard', title: '首页' }]
      })
    })

    it('保存 routeHistory（第一个非 hiddenInMenu 路由）', () => {
      const routeData = { route: { path: '/dashboard', meta: {} } }
      mockGenerRouteMap.mockReturnValue(
        new Map<string, any>([['/dashboard', routeData]])
      )

      const { setupRoutes } = useRoutesHandler(
        mockRouter,
        processedRoutes as any[],
        {
          setupRoutesType: 'all',
          flatRoutes: false
        }
      )

      setupRoutes()

      expect(mockRouterStore.clearRouteHistory).toHaveBeenCalled()
      expect(mockRouterStore.addRouteHistory).toHaveBeenCalledWith({
        path: '/dashboard',
        meta: {}
      })
    })
  })

  describe('setupRoutes — roleMenu 模式', () => {
    it('调用 generRoutesByRoleMenu', () => {
      const roleMenuRoutes = [{ path: '/dashboard', meta: {} }]
      mockGenerRoutesByRoleMenu.mockReturnValue(roleMenuRoutes)
      const routeMap = new Map()
      mockGenerRouteMap
        .mockReturnValueOnce(routeMap) // 构造时
        .mockReturnValueOnce(new Map()) // setupRoutes 时

      const { setupRoutes } = useRoutesHandler(mockRouter, [] as any[], {
        setupRoutesType: 'roleMenu',
        flatRoutes: false
      })

      const roleMenu = [{ path: '/dashboard', title: '首页' }]
      setupRoutes(roleMenu)

      expect(mockGenerRoutesByRoleMenu).toHaveBeenCalledWith(roleMenu, routeMap)
    })
  })

  describe('setupRoutes — permissions 模式', () => {
    it('调用 generRoutesByPermissions', () => {
      const permRoutes = [{ path: '/dashboard', meta: {} }]
      mockGenerRoutesByPermissions.mockReturnValue(permRoutes)
      mockGenerRouteMap
        .mockReturnValueOnce(new Map()) // 构造时
        .mockReturnValueOnce(new Map()) // setupRoutes 时

      const { setupRoutes } = useRoutesHandler(
        mockRouter,
        processedRoutes as any[],
        {
          setupRoutesType: 'permissions',
          flatRoutes: false
        }
      )

      const permMap = new Map<string, any>([['/dashboard', true]])
      setupRoutes([], permMap)

      expect(mockGenerRoutesByPermissions).toHaveBeenCalledWith(
        permMap,
        processedRoutes
      )
    })
  })

  describe('addRoutes', () => {
    it('flatRoutes=true 时先扁平化', () => {
      const flatResult = [{ path: '/dashboard', meta: {} }]
      mockFlatRoutes.mockReturnValue(flatResult)
      mockGenerRouteMap.mockReturnValue(
        new Map<string, any>([
          ['/dashboard', { route: { path: '/dashboard', meta: {} } }]
        ])
      )

      const { setupRoutes } = useRoutesHandler(mockRouter, [] as any[], {
        setupRoutesType: 'all',
        flatRoutes: true
      })

      setupRoutes()

      expect(mockFlatRoutes).toHaveBeenCalled()
    })

    it('addRouteParentName 有值时用 router.addRoute(parentName, route)', () => {
      mockGenerRouteMap.mockReturnValue(
        new Map<string, any>([['/a', { route: { path: '/a', meta: {} } }]])
      )

      const { setupRoutes } = useRoutesHandler(mockRouter, [] as any[], {
        setupRoutesType: 'all',
        flatRoutes: false,
        addRouteParentName: 'Layout'
      })

      setupRoutes()

      expect(mockRouter.addRoute).toHaveBeenCalledWith(
        'Layout',
        expect.anything()
      )
    })

    it('addRouteParentName 无值时用 router.addRoute(route)', () => {
      mockGenerRouteMap.mockReturnValue(
        new Map<string, any>([['/a', { route: { path: '/a', meta: {} } }]])
      )

      const { setupRoutes } = useRoutesHandler(mockRouter, [] as any[], {
        setupRoutesType: 'all',
        flatRoutes: false
      })

      setupRoutes()

      expect(mockRouter.addRoute).toHaveBeenCalledWith(expect.anything())
    })

    it('多次 setupRoutes 时先移除上次添加的路由', () => {
      const removeFn = vi.fn()
      mockRouter.addRoute.mockReturnValue(removeFn)
      mockGenerRouteMap.mockReturnValue(
        new Map<string, any>([['/a', { route: { path: '/a', meta: {} } }]])
      )

      const { setupRoutes } = useRoutesHandler(mockRouter, [] as any[], {
        setupRoutesType: 'all',
        flatRoutes: false
      })

      setupRoutes()
      setupRoutes()

      expect(removeFn).toHaveBeenCalled()
    })
  })

  describe('saveRouteHistory', () => {
    it('有 redirectNode 时使用 redirectNode 的 route', () => {
      const redirectNode = { route: { path: '/leaf', meta: {} } }
      mockProcessRoutes.mockReturnValue([{ path: '/parent', meta: {} }])
      mockGenerRouteMap.mockReturnValue(
        new Map<string, any>([
          ['/parent', { route: { path: '/parent', meta: {} }, redirectNode }]
        ])
      )

      const { setupRoutes } = useRoutesHandler(
        mockRouter,
        [{ path: '/parent', meta: {} }] as any[],
        {
          setupRoutesType: 'all',
          flatRoutes: false
        }
      )

      setupRoutes()

      expect(mockRouterStore.addRouteHistory).toHaveBeenCalledWith({
        path: '/leaf',
        meta: {}
      })
    })

    it('所有路由都 hiddenInMenu 时不添加 routeHistory', () => {
      const hiddenRoutes = [{ path: '/hidden', meta: { hiddenInMenu: true } }]
      mockProcessRoutes.mockReturnValue(hiddenRoutes)
      mockGenerRouteMap.mockReturnValue(
        new Map<string, any>([
          [
            '/hidden',
            { route: { path: '/hidden', meta: { hiddenInMenu: true } } }
          ]
        ])
      )

      const { setupRoutes } = useRoutesHandler(mockRouter, [] as any[], {
        setupRoutesType: 'all',
        flatRoutes: false
      })

      setupRoutes()

      expect(mockRouterStore.addRouteHistory).not.toHaveBeenCalled()
    })
  })

  describe('getTopMenuByPath', () => {
    it('返回 path 对应的顶级菜单', () => {
      const topMenuRoute = {
        path: '/module',
        meta: { topMenu: true, title: '模块' }
      }
      const childRoute = { path: '/module/page', meta: {} }
      const childItem = {
        route: childRoute,
        parentNode: { route: topMenuRoute }
      }
      const parentItem = { route: topMenuRoute }

      mockGenerRouteMap.mockReturnValue(
        new Map<string, any>([
          ['/module', parentItem],
          ['/module/page', childItem]
        ])
      )
      mockGenerUserMenu.mockReturnValue([{ path: '/module', title: '模块' }])

      const { setupRoutes, getTopMenuByPath } = useRoutesHandler(
        mockRouter,
        [] as any[],
        {
          setupRoutesType: 'all',
          flatRoutes: false
        }
      )

      setupRoutes()

      const result = getTopMenuByPath('/module/page')

      expect(mockGenerUserMenu).toHaveBeenCalledWith([topMenuRoute])
      expect(result).toEqual({ path: '/module', title: '模块' })
    })

    it('path 无对应顶级菜单时返回 null', () => {
      const childRoute = { path: '/no-top', meta: {} }
      const childItem = { route: childRoute }

      mockGenerRouteMap.mockReturnValue(
        new Map<string, any>([['/no-top', childItem]])
      )

      const { setupRoutes, getTopMenuByPath } = useRoutesHandler(
        mockRouter,
        [] as any[],
        {
          setupRoutesType: 'all',
          flatRoutes: false
        }
      )

      setupRoutes()

      expect(getTopMenuByPath('/no-top')).toBeNull()
    })

    it('缓存计算结果', () => {
      const topMenuRoute = {
        path: '/mod',
        meta: { topMenu: true, title: '模块' }
      }
      const childRoute = { path: '/mod/page', meta: {} }
      const childItem = {
        route: childRoute,
        parentNode: { route: topMenuRoute }
      }
      const parentItem = { route: topMenuRoute }

      mockGenerRouteMap.mockReturnValue(
        new Map<string, any>([
          ['/mod', parentItem],
          ['/mod/page', childItem]
        ])
      )
      mockGenerUserMenu.mockReturnValue([{ path: '/mod', title: '模块' }])

      const { setupRoutes, getTopMenuByPath } = useRoutesHandler(
        mockRouter,
        [] as any[],
        {
          setupRoutesType: 'all',
          flatRoutes: false
        }
      )

      setupRoutes()

      getTopMenuByPath('/mod/page')
      getTopMenuByPath('/mod/page')

      // generUserMenu 只调用 1 次（第二次命中缓存）
      const generUserMenuCalls = mockGenerUserMenu.mock.calls.filter(
        (call: any[]) =>
          call.length > 0 &&
          Array.isArray(call[0]) &&
          call[0].some((r: any) => r.meta?.topMenu)
      )
      expect(generUserMenuCalls).toHaveLength(1)
    })
  })

  describe('错误处理', () => {
    it('setupRoutes 异常时 catch 不抛出', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      mockGenerRouteMap
        .mockReturnValueOnce(new Map())
        .mockImplementation(() => {
          throw new Error('test error')
        })

      const { setupRoutes } = useRoutesHandler(mockRouter, [] as any[], {
        setupRoutesType: 'all',
        flatRoutes: false
      })

      expect(() => setupRoutes()).not.toThrow()
      expect(consoleSpy).toHaveBeenCalledWith(
        '[RoutesHandler] setupRoutes failed:',
        expect.any(Error)
      )
      consoleSpy.mockRestore()
    })
  })
})
