import type { RouteRecordRaw, Router } from 'vue-router'
import type { RoutesHandlerOptions, RouteMap, RoleMenu } from './types'
import { useUserStore, useRouterStore } from '@/store'
import { composeFns } from '@/utils'
import {
  formatRoutes,
  joinRoutesPath,
  sortRoutes,
  flatRoutes,
  setRoutesComponent,
  generRouteMap,
  generUserMenu,
  generRoutesByRoleMenu,
  generRoutesByPermissions
} from './utils'

export const useRoutesHandler = (
  router: Router,
  originRoutes: RouteRecordRaw[],
  options: RoutesHandlerOptions
) => {
  const _originRoutes = composeFns([
    formatRoutes,
    sortRoutes,
    joinRoutesPath,
    setRoutesComponent
  ])(originRoutes)
  const _originRouteMap = generRouteMap(_originRoutes)

  let routes = _originRoutes
  // path => routeData
  let routeMap: RouteMap = _originRouteMap
  const getRouteByPath = (path: string) => routeMap.get(path)

  // 保存用户菜单
  const saveUserMenu = () => {
    const userStore = useUserStore()
    userStore.setState({
      userMenu: generUserMenu(routes)
    })
  }

  // 保存stores第一个节点
  const saveRouteHistory = () => {
    const routerStore = useRouterStore()
    routerStore.clearRouteHistory()

    const path = routes[0]?.path
    const routeData = routeMap.get(path)

    let firstRoute = routeData?.route
    if (routeData?.redirectNode) {
      firstRoute = routeData.redirectNode.route
    }

    if (firstRoute) {
      routerStore.addRouteHistory({
        path: firstRoute.path,
        meta: firstRoute.meta || {}
      })
    }
  }

  // 添加路由
  let removeRouteFns: Function[] = []
  const addRoutes = () => {
    // 移除上次添加的路由
    removeRouteFns.forEach((fn) => fn())
    removeRouteFns = []

    let _routes = routes
    if (options.flatRoutes) {
      _routes = flatRoutes(routes)
    }
    _routes.forEach((route) => {
      const removeRouteFn = router.addRoute(options.addRouteParentName, route)
      removeRouteFns.push(removeRouteFn)
    })
  }

  // `@/store/user` 执行
  const setupRoutes = (
    roleMenu: RoleMenu[] = [],
    permissionsMap: Map<string, boolean> = new Map()
  ) => {
    if (options.setupRoutesType === 'all') {
      routes = _originRoutes
      routeMap = _originRouteMap
    }

    if (options.setupRoutesType === 'roleMenu') {
      routes = generRoutesByRoleMenu(roleMenu, routeMap)
      routeMap = generRouteMap(routes)
    }

    if (options.setupRoutesType === 'permissions') {
      routes = generRoutesByPermissions(permissionsMap, _originRoutes)
      routeMap = generRouteMap(routes)
    }

    addRoutes()
    saveUserMenu()
    saveRouteHistory()
  }

  return {
    getRouteByPath,
    setupRoutes
  }
}
