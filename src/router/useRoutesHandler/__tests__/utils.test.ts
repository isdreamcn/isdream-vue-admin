const { mockCreateBasicLayout, mockCreateHasNameComponent, mockAppConfig } =
  vi.hoisted(() => ({
    mockCreateBasicLayout: vi.fn((path: string) => `layout:${path}`),
    mockCreateHasNameComponent: vi.fn(
      (_comp: any, path: string) => `named:${path}`
    ),
    mockAppConfig: {
      defaultRouteMeta: {
        keepAlive: true,
        hiddenInMenu: false,
        hiddenInBread: false,
        needLoading: false,
        needToken: true,
        needRouteHistory: true
      }
    }
  }))

vi.mock(
  import('@/views/layout'),
  () =>
    ({
      createBasicLayout: mockCreateBasicLayout,
      createHasNameComponent: mockCreateHasNameComponent
    }) as any
)

vi.mock(import('@/config'), () => ({ appConfig: mockAppConfig }) as any)

import {
  processRoutes,
  flatRoutes,
  generRouteMap,
  generUserMenu,
  generRoutesByRoleMenu,
  generRoutesByPermissions
} from '../utils'

describe('processRoutes', () => {
  it('合并 defaultRouteMeta 到 meta', () => {
    const routes = [{ path: '/test', meta: { title: '测试' } }] as any[]

    const result = processRoutes(routes)

    expect(result[0].meta).toEqual({
      keepAlive: true,
      hiddenInMenu: false,
      hiddenInBread: false,
      needLoading: false,
      needToken: true,
      needRouteHistory: true,
      title: '测试'
    })
  })

  it('相对路径拼接 prePath', () => {
    const routes = [{ path: 'child' }] as any[]

    const result = processRoutes(routes, '/parent')

    expect(result[0].path).toBe('/parent/child')
  })

  it('以 / 开头的路径不变', () => {
    const routes = [{ path: '/absolute' }] as any[]

    const result = processRoutes(routes)

    expect(result[0].path).toBe('/absolute')
  })

  it('有 component 时调用 createHasNameComponent', () => {
    const Comp = {} as any
    const routes = [{ path: '/test', component: Comp }] as any[]

    const result = processRoutes(routes)

    expect(mockCreateHasNameComponent).toHaveBeenCalledWith(Comp, '/test')
    expect(result[0].component).toBe('named:/test')
  })

  it('无 component 有 children 时调用 createBasicLayout', () => {
    const routes = [{ path: '/parent', children: [{ path: 'child' }] }] as any[]

    processRoutes(routes)

    expect(mockCreateBasicLayout).toHaveBeenCalledWith('/parent')
  })

  it('递归处理 children 并传递正确的 prePath', () => {
    const routes = [
      {
        path: '/parent',
        children: [{ path: 'child', component: {} as any }]
      }
    ] as any[]

    const result = processRoutes(routes)

    expect(result[0].children![0].path).toBe('/parent/child')
    expect(mockCreateHasNameComponent).toHaveBeenCalledWith(
      expect.anything(),
      '/parent/child'
    )
  })

  it('按 meta.sort 排序', () => {
    const routes = [
      { path: '/c', meta: { sort: 3 } },
      { path: '/a', meta: { sort: 1 } },
      { path: '/b', meta: { sort: 2 } }
    ] as any[]

    const result = processRoutes(routes)

    expect(result.map((r) => r.path)).toEqual(['/a', '/b', '/c'])
  })

  it('空数组返回空数组', () => {
    expect(processRoutes([])).toEqual([])
  })
})

describe('flatRoutes', () => {
  it('只取叶子节点', () => {
    const routes = [
      {
        path: '/parent',
        children: [{ path: '/parent/child' }]
      }
    ] as any[]

    const result = flatRoutes(routes)

    expect(result).toHaveLength(1)
    expect(result[0].path).toBe('/parent/child')
  })

  it('单层路由直接返回', () => {
    const routes = [{ path: '/a' }, { path: '/b' }] as any[]

    const result = flatRoutes(routes)

    expect(result).toEqual(routes)
  })

  it('空数组返回空数组', () => {
    expect(flatRoutes([])).toEqual([])
  })

  it('3 层嵌套只取最深层', () => {
    const routes = [
      {
        path: '/a',
        children: [
          {
            path: '/a/b',
            children: [{ path: '/a/b/c' }]
          }
        ]
      }
    ] as any[]

    const result = flatRoutes(routes)

    expect(result).toHaveLength(1)
    expect(result[0].path).toBe('/a/b/c')
  })
})

describe('generRouteMap', () => {
  it('生成 path 到 RouteMapItem 的映射', () => {
    const routes = [{ path: '/test' }] as any[]

    const map = generRouteMap(routes)

    expect(map.has('/test')).toBe(true)
    expect(map.get('/test')!.route.path).toBe('/test')
  })

  it('正确设置 parentNode', () => {
    const routes = [
      {
        path: '/parent',
        children: [{ path: '/parent/child' }]
      }
    ] as any[]

    const map = generRouteMap(routes)

    const childItem = map.get('/parent/child')!
    expect(childItem.parentNode).toBeDefined()
    expect(childItem.parentNode!.route.path).toBe('/parent')
  })

  it('第一个非 hiddenInMenu 叶子为 redirectNode', () => {
    const routes = [
      {
        path: '/parent',
        children: [{ path: '/parent/visible' }]
      }
    ] as any[]

    const map = generRouteMap(routes)

    const parentItem = map.get('/parent')!
    expect(parentItem.redirectNode).toBeDefined()
    expect(parentItem.redirectNode!.route.path).toBe('/parent/visible')
  })

  it('hiddenInMenu 叶子不作为 redirectNode', () => {
    const routes = [
      {
        path: '/parent',
        children: [
          { path: '/parent/hidden', meta: { hiddenInMenu: true } },
          { path: '/parent/visible' }
        ]
      }
    ] as any[]

    const map = generRouteMap(routes)

    const parentItem = map.get('/parent')!
    expect(parentItem.redirectNode!.route.path).toBe('/parent/visible')
  })

  it('多层嵌套时 redirectNode 向上冒泡', () => {
    const routes = [
      {
        path: '/a',
        children: [
          {
            path: '/a/b',
            children: [{ path: '/a/b/c' }]
          }
        ]
      }
    ] as any[]

    const map = generRouteMap(routes)

    const aItem = map.get('/a')!
    const bItem = map.get('/a/b')!
    expect(aItem.redirectNode!.route.path).toBe('/a/b/c')
    expect(bItem.redirectNode!.route.path).toBe('/a/b/c')
  })
})

describe('generUserMenu', () => {
  it('生成菜单数据', () => {
    const routes = [
      { path: '/home', meta: { title: '首页', icon: 'home', link: '/home' } }
    ] as any[]

    const menu = generUserMenu(routes)

    expect(menu[0]).toEqual({
      path: '/home',
      title: '首页',
      icon: 'home',
      link: '/home',
      children: undefined
    })
  })

  it('过滤 hiddenInMenu 路由', () => {
    const routes = [
      { path: '/visible', meta: { title: '可见' } },
      { path: '/hidden', meta: { title: '隐藏', hiddenInMenu: true } }
    ] as any[]

    const menu = generUserMenu(routes)

    expect(menu).toHaveLength(1)
    expect(menu[0].path).toBe('/visible')
  })

  it('title 为空时回退使用 path', () => {
    const routes = [{ path: '/no-title', meta: {} }] as any[]

    const menu = generUserMenu(routes)

    expect(menu[0].title).toBe('/no-title')
  })

  it('递归生成 children', () => {
    const routes = [
      {
        path: '/parent',
        meta: { title: '父级' },
        children: [{ path: '/parent/child', meta: { title: '子级' } }]
      }
    ] as any[]

    const menu = generUserMenu(routes)

    expect(menu[0].children).toHaveLength(1)
    expect(menu[0].children![0].title).toBe('子级')
  })
})

describe('generRoutesByRoleMenu', () => {
  it('按 roleMenu 的 path 匹配路由', () => {
    const routeMap = new Map([
      ['/a', { route: { path: '/a', meta: {} } }]
    ]) as any

    const result = generRoutesByRoleMenu([{ path: '/a' }], routeMap)

    expect(result).toHaveLength(1)
    expect(result[0].path).toBe('/a')
  })

  it('过滤 routeMap 中不存在的 path', () => {
    const routeMap = new Map() as any

    const result = generRoutesByRoleMenu([{ path: '/not-exist' }], routeMap)

    expect(result).toHaveLength(0)
  })

  it('roleMenu 的 title/icon/link 覆盖 meta 中的值', () => {
    const routeMap = new Map([
      [
        '/a',
        {
          route: {
            path: '/a',
            meta: { title: '原始', icon: 'old', link: '/old' }
          }
        }
      ]
    ]) as any

    const result = generRoutesByRoleMenu(
      [{ path: '/a', title: '新标题', icon: 'new', link: '/new' }],
      routeMap
    )

    const item = result[0] as any
    expect(item.meta.title).toBe('新标题')
    expect(item.meta.icon).toBe('new')
    expect(item.meta.link).toBe('/new')
  })

  it('roleMenu 无 title/icon/link 时保留 meta 原值', () => {
    const routeMap = new Map([
      [
        '/a',
        { route: { path: '/a', meta: { title: '原始标题', icon: 'orig' } } }
      ]
    ]) as any

    const result = generRoutesByRoleMenu([{ path: '/a' }], routeMap)

    const item = result[0] as any
    expect(item.meta.title).toBe('原始标题')
    expect(item.meta.icon).toBe('orig')
  })

  it('递归处理 children', () => {
    const routeMap = new Map([
      ['/parent', { route: { path: '/parent', meta: {} } }],
      ['/parent/child', { route: { path: '/parent/child', meta: {} } }]
    ]) as any

    const result = generRoutesByRoleMenu(
      [{ path: '/parent', children: [{ path: '/parent/child' }] }],
      routeMap
    )

    expect(result[0].children).toHaveLength(1)
    expect(result[0].children![0].path).toBe('/parent/child')
  })
})

describe('generRoutesByPermissions', () => {
  it('保留 ignoreAuth 路由', () => {
    const routes = [{ path: '/public', meta: { ignoreAuth: true } }] as any[]
    const permMap = new Map<string, boolean>()

    const result = generRoutesByPermissions(permMap, routes)

    expect(result).toHaveLength(1)
    expect(result[0].path).toBe('/public')
  })

  it('保留 permissionsMap 中存在的路由', () => {
    const routes = [{ path: '/allowed', meta: {} }] as any[]
    const permMap = new Map([['/allowed', true]])

    const result = generRoutesByPermissions(permMap, routes)

    expect(result).toHaveLength(1)
  })

  it('过滤 permissionsMap 中不存在的路由', () => {
    const routes = [
      { path: '/denied', meta: {} },
      { path: '/allowed', meta: {} }
    ] as any[]
    const permMap = new Map([['/allowed', true]])

    const result = generRoutesByPermissions(permMap, routes)

    expect(result).toHaveLength(1)
    expect(result[0].path).toBe('/allowed')
  })

  it('递归处理 children', () => {
    const routes = [
      {
        path: '/parent',
        meta: { ignoreAuth: true },
        children: [{ path: '/parent/child', meta: {} }]
      }
    ] as any[]
    const permMap = new Map([['/parent/child', true]])

    const result = generRoutesByPermissions(permMap, routes)

    expect(result[0].children).toHaveLength(1)
  })

  it('空 permissionsMap 只保留 ignoreAuth 路由', () => {
    const routes = [
      { path: '/public', meta: { ignoreAuth: true } },
      { path: '/private', meta: {} }
    ] as any[]
    const permMap = new Map<string, boolean>()

    const result = generRoutesByPermissions(permMap, routes)

    expect(result).toHaveLength(1)
    expect(result[0].path).toBe('/public')
  })
})
