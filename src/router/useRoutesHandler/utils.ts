import type { RouteRecordRaw } from 'vue-router'
import type { UserMenu, RoleMenu, RouteMapItem, RouteMap } from './types'
import { createBasicLayout, createHasNameComponent } from '@/views/layout'
import { appConfig } from '@/config'

const hiddenInMenu = (route: RouteRecordRaw) =>
  route.meta?.hiddenInMenu ?? appConfig.defaultRouteMeta.hiddenInMenu

// 格式化routes
export const formatRoutes = (routes: RouteRecordRaw[]) => {
  return routes.map(
    (route) =>
      ({
        ...route,
        children: route.children?.length ? route.children : undefined
      } as RouteRecordRaw)
  )
}

// path => /path
export const joinRoutesPath = (routes: RouteRecordRaw[], prePath = '') => {
  return routes.map((route): RouteRecordRaw => {
    const path = route.path.startsWith('/')
      ? route.path
      : `${prePath}/${route.path}`
    return Object.assign({}, route, {
      path,
      children: route.children && joinRoutesPath(route.children, path)
    })
  })
}

// 排序
export const sortRoutes = (routes: RouteRecordRaw[]) => {
  return routes
    .sort((a, b) => (a.meta?.sort || 0) - (b.meta?.sort || 0))
    .map(
      (route): RouteRecordRaw =>
        Object.assign({}, route, {
          children: route.children && sortRoutes(route.children)
        })
    )
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

/*
  KeepAlive 缓存
  设置了`component`，则自动设置`component.name`, 用于 KeepAlive include
  深度缓存
  route有`children`、但没有设置`component`，则自动设置component = createBasicLayout()
*/
export const setRoutesComponent = (routes: RouteRecordRaw[]) => {
  return routes.map((route): RouteRecordRaw => {
    let component = route.component
    if (component) {
      component = createHasNameComponent(component, route.path)
    } else if (route.children) {
      component = createBasicLayout(route.path)
    }
    return Object.assign({}, route, {
      component,
      children: route.children && setRoutesComponent(route.children)
    })
  })
}

// map => 根据path快速查找route
export const generRouteMap = (
  routes: RouteRecordRaw[],
  routeMap: RouteMap = new Map(),
  parentNode?: RouteMapItem
) => {
  routes.forEach((route, index) => {
    const _route: RouteMapItem = { ...route, parentNode }
    routeMap.set(route.path, _route)
    if (route.children) {
      return generRouteMap(route.children, routeMap, _route)
    }
    // 路由扁平化后，不会存在上下级关系
    // 用于`../guard/useRedirect`重定向到第一个叶子节点
    if (index === 0) {
      let parentRoute = _route.parentNode
      while (parentRoute) {
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
    .filter((route) => !hiddenInMenu(route))
    .map((route) => ({
      path: route.path,
      title: route.meta?.title || route.path,
      icon: route.meta?.icon,
      link: route.meta?.link,
      children: route.children && generUserMenu(route.children)
    }))
}

// roleMenu => routes
export const generRoutes = (
  roleMenu: RoleMenu[],
  routeMap: RouteMap
): RouteRecordRaw[] => {
  return roleMenu
    .filter((item) => routeMap.has(item.path))
    .map((item) => {
      const routeItem = routeMap.get(item.path)!
      const meta = routeItem.meta || {}
      return {
        ...routeItem,
        meta: {
          ...meta,
          icon: item.icon ?? meta.icon,
          title: item.title ?? meta.title,
          link: item.link ?? meta.link
        },
        children: item.children && generRoutes(item.children, routeMap)
      } as RouteRecordRaw
    })
}
