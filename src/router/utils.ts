import type { RouteRecordRaw, RouteRecordName } from 'vue-router'
import type { UserMenu } from '@/store'

import { nextTick } from 'vue'
import { useUserStore, useRouterStore } from '@/store'
import { appConfig } from '@/config'
import { createBasicLayout } from '@/views/layout'
import router from './index'

export interface RoutesHandlerOptions {
  // 生成全部菜单，不使用权限菜单
  generatorMenu: boolean
  addRouteParentName: RouteRecordName
  // 路由扁平化，只渲染最后一层（性能比较高，但父级component不会渲染, 缓存路由较多时推荐使用）
  flatRoutes: boolean
}

// 角色菜单
export interface RoleMenu extends PartialDeep<UserMenu> {
  path: string
  children?: RoleMenu[]
}

// path => route
export type RouteMapItem = RouteRecordRaw & {
  parent?: RouteMapItem
}

export class RoutesHandler {
  private options: RoutesHandlerOptions
  originRoutes: RouteRecordRaw[] = []
  // 菜单
  private userMenu: UserMenu[] = []
  // path => route
  private routeMap: Map<string, RouteMapItem> = new Map()

  constructor(routes: RouteRecordRaw[], options: RoutesHandlerOptions) {
    this.options = options
    // path => /path
    routes = this.joinRoutePath(routes)
    // 自动设置component => (实现深度缓存)
    if (!options.flatRoutes) {
      routes = this.autoSetComponent(routes)
    }
    // /path => route
    this.setPathToRouteMap(routes)

    if (options.generatorMenu) {
      routes = this.sortRoutes(routes)
      this.userMenu = this.generatorMenu(routes)
      this.saveUserMenu()
      this.saveRouteHistory()
      if (options.flatRoutes) {
        routes = this.flatRoutes(routes)
      }
      this.originRoutes = routes
    }
  }

  // path => /path
  private joinRoutePath(routes: RouteRecordRaw[], prePath = '') {
    return routes.map((route): RouteRecordRaw => {
      const path = route.path.startsWith('/')
        ? route.path
        : `${prePath}/${route.path}`
      return Object.assign(route, {
        path,
        children: route.children
          ? this.joinRoutePath(route.children, path)
          : undefined
      })
    })
  }

  // map根据path快速查找route
  private setPathToRouteMap(routes: RouteRecordRaw[], parent?: RouteMapItem) {
    routes.forEach((route) => {
      const _route = { ...route, parent }
      this.routeMap.set(route.path, _route)
      this.setPathToRouteMap(route.children || [], _route)
    })
  }

  getRouteByPath(path: string) {
    return this.routeMap.get(path)
  }

  // 排序
  private sortRoutes(routes: RouteRecordRaw[]) {
    return routes
      .sort((a, b) => (a.meta?.sort || 0) - (b.meta?.sort || 0))
      .map(
        (route): RouteRecordRaw =>
          Object.assign(route, {
            children: route.children?.length
              ? this.sortRoutes(route.children)
              : undefined
          })
      )
  }

  // 路由扁平化
  private flatRoutes(originRoutes: RouteRecordRaw[]) {
    const _routes: RouteRecordRaw[] = []
    const _flatRoutesC = (routes: RouteRecordRaw[]) => {
      routes.forEach((route) => {
        if (route.children?.length) {
          _flatRoutesC(route.children)
        } else {
          _routes.push(route)
        }
      })
    }
    _flatRoutesC(originRoutes)
    return _routes
  }

  // 自动设置component => (实现深度缓存)
  // route有`children`、但没有设置component，则自动设置component = createBasicLayout()
  private autoSetComponent(routes: RouteRecordRaw[]) {
    return routes.map((route): RouteRecordRaw => {
      return Object.assign(route, {
        component:
          route.component ??
          (route.children?.length ? createBasicLayout(route.path) : undefined),
        children: route.children?.length
          ? this.autoSetComponent(route.children)
          : undefined
      })
    })
  }

  // routes => menu
  private generatorMenu(routes: RouteRecordRaw[]): UserMenu[] {
    return routes
      .filter(
        (route) =>
          !(route.meta?.hiddenInMenu ?? appConfig.defaultRouteMeta.hiddenInMenu)
      )
      .map((route) => {
        return {
          path: route.path,
          title: route.meta?.title || route.path,
          icon: route.meta?.icon,
          link: route.meta?.link,
          children: route.children?.length
            ? this.generatorMenu(route.children)
            : undefined
        }
      })
  }

  private saveUserMenu() {
    // app.use(pinia)还没有执行
    nextTick(() => {
      const userStore = useUserStore()
      userStore.setState({
        userMenu: this.userMenu
      })
    })
  }

  getNotChildRoute<T extends { children?: any[] } = RouteRecordRaw>(
    routes: T[]
  ): T | undefined {
    let route: any = undefined
    const _getNotChildRoute = (routes: T[]) => {
      if (route) {
        return
      }
      for (const item of routes) {
        if (!item.children?.length) {
          route = item
          return
        } else {
          _getNotChildRoute(item.children)
        }
      }
    }
    _getNotChildRoute(routes)

    return route
  }

  // 保存userMenu第一个叶子节点
  private saveRouteHistory() {
    nextTick(() => {
      const routerStore = useRouterStore()
      routerStore.clearRouteHistory()
      const route = this.getNotChildRoute<UserMenu>(this.userMenu)
      if (route) {
        routerStore.addRouteHistory({
          path: route.path,
          meta: {
            ...route
          }
        })
      }
    })
  }

  // 使用角色菜单
  useRoleMenu(roleMenu: RoleMenu[]) {
    if (this.options.generatorMenu) {
      console.warn('All routes have been registered')
    } else {
      let routes = this.roleMenuToOriginRoutes(roleMenu)
      this.userMenu = this.generatorMenu(routes)
      if (this.options.flatRoutes) {
        routes = this.flatRoutes(routes)
      }
      this.registeredRoutes(this.options.addRouteParentName, routes)
      this.originRoutes = routes
    }
    this.saveUserMenu()
    this.saveRouteHistory()
  }

  private roleMenuToOriginRoutes(
    roleMenu: RoleMenu[],
    parent?: RouteMapItem
  ): RouteRecordRaw[] {
    return roleMenu
      .filter((item) => this.routeMap.has(item.path))
      .map((item) => {
        const routeItem = this.routeMap.get(item.path)!
        const meta = routeItem.meta || {}
        const _route: RouteMapItem = {
          ...routeItem,
          parent,
          meta: {
            ...meta,
            icon: item.icon ?? meta.icon,
            title: item.title ?? meta.title,
            link: item.link ?? meta.link
          }
        }
        _route.children = this.roleMenuToOriginRoutes(
          item.children || [],
          _route
        )
        this.routeMap.set(item.path, _route)
        return _route
      })
  }
  // 根据角色权限注册路由、生成菜单
  private registeredRoutes(
    parentName: RouteRecordName,
    routes: RouteRecordRaw[]
  ) {
    routes.forEach((route) => {
      router.addRoute(parentName, route)
    })
  }
}
