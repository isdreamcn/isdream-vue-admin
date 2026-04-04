import type { RouteRecordRaw, RouteComponent } from 'vue-router'
import type { UserMenu, RoleMenu, RouteMapItem, RouteMap } from './types'
import { createBasicLayout, createHasNameComponent } from '@/views/layout'
import { appConfig } from '@/config'

/**
 * 格式化 meta、规范化 path、排序、设置 component
 */
export const processRoutes = (
  routes: RouteRecordRaw[],
  prePath = ''
): RouteRecordRaw[] => {
  const defaultMeta = appConfig.defaultRouteMeta

  const processed = routes.map((route): RouteRecordRaw => {
    const meta = { ...defaultMeta, ...route.meta }

    // 规范化 path
    const path = route.path.startsWith('/')
      ? route.path
      : `${prePath}/${route.path}`

    // 设置 component
    let component: RouteComponent | undefined = route.component as
      | RouteComponent
      | undefined
    if (component) {
      component = createHasNameComponent(component, path)
    } else if (route.children) {
      component = createBasicLayout(path)
    }

    return {
      ...route,
      meta,
      path,
      component,
      children: route.children?.length
        ? processRoutes(route.children, path)
        : undefined
    } as RouteRecordRaw
  })

  // 排序
  return processed.sort((a, b) => (a.meta?.sort || 0) - (b.meta?.sort || 0))
}

// 路由扁平化
export const flatRoutes = (
  routes: RouteRecordRaw[],
  routesArr: RouteRecordRaw[] = []
) => {
  routes.forEach((route) => {
    if (route.children) {
      return flatRoutes(route.children, routesArr)
    }
    routesArr.push(route)
  })
  return routesArr
}

// map => 根据path快速查找route
export const generRouteMap = (
  routes: RouteRecordRaw[],
  routeMap: RouteMap = new Map(),
  parentNode?: RouteMapItem
) => {
  let flag = false
  routes.forEach((route) => {
    const _route: RouteMapItem = { route, parentNode }
    routeMap.set(route.path, _route)
    if (route.children) {
      return generRouteMap(route.children, routeMap, _route)
    }
    // 路由扁平化后，不会存在上下级关系
    // 用于`../guard/useRedirect`重定向到第一个叶子节点
    if (!flag && !route.meta?.hiddenInMenu) {
      flag = true
      let parentRoute = _route.parentNode
      while (parentRoute && !parentRoute.redirectNode) {
        parentRoute.redirectNode = _route
        parentRoute = parentRoute.parentNode
      }
    }
  })
  return routeMap
}

// routes => userMenu
export const generUserMenu = (routes: RouteRecordRaw[]): UserMenu[] => {
  return routes
    .filter((route) => !route?.meta?.hiddenInMenu)
    .map((route) => ({
      path: route.path,
      title: route.meta?.title || route.path,
      icon: route.meta?.icon,
      link: route.meta?.link,
      children: route.children && generUserMenu(route.children)
    }))
}

// roleMenu => routes
export const generRoutesByRoleMenu = (
  roleMenu: RoleMenu[],
  routeMap: RouteMap
): RouteRecordRaw[] => {
  return roleMenu
    .filter((item) => routeMap.has(item.path))
    .map((item) => {
      const routeData = routeMap.get(item.path)!
      const meta = routeData.route.meta || {}
      return {
        ...routeData.route,
        meta: {
          ...meta,
          icon: item.icon ?? meta.icon,
          title: item.title ?? meta.title,
          link: item.link ?? meta.link
        },
        children:
          item.children && generRoutesByRoleMenu(item.children, routeMap)
      } as RouteRecordRaw
    })
}

// permissions => routes
export const generRoutesByPermissions = (
  permissionsMap: Map<string, boolean>,
  routes: RouteRecordRaw[]
): RouteRecordRaw[] => {
  return routes
    .filter((item) => item.meta?.ignoreAuth || permissionsMap.get(item.path))
    .map(
      (item) =>
        ({
          ...item,
          children:
            item.children &&
            generRoutesByPermissions(permissionsMap, item.children)
        }) as RouteRecordRaw
    )
}
