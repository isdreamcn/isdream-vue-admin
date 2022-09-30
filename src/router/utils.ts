import type { RouteRecordRaw } from 'vue-router'
import type { UserMenu } from '@/store'

import { nextTick } from 'vue'
import { useUserStore, useRouterStore } from '@/store'
import appConfig from '@/config'
import { createBasicLayout } from '@/views/layout'
import router from './index'

export interface RoutesHandlerOptions {
  // 生成全部菜单，不使用权限菜单
  generatorMenu: boolean
  addRouteParentName: string
  // 路由扁平化，只渲染最后一层（性能比较高，但父级component不会渲染, 路由较多时推荐使用）
  flatRoutes: boolean
}

// 角色菜单
export interface RoleMenu extends PartialDeep<UserMenu> {
  pathKey: string
  children?: RoleMenu[]
}

export class RoutesHandler {
  options: RoutesHandlerOptions
  originRoutes: RouteRecordRaw[] = []
  // 菜单
  userMenu: UserMenu[] = []
  // pathKey => route
  routeMap: Map<string, RouteRecordRaw> = new Map()

  /**
   * @description: `generatorMenu` 会过滤掉`name`为空的route
   */
  constructor(routes: RouteRecordRaw[], options: RoutesHandlerOptions) {
    this.options = options
    routes = this.autoSetComponent(routes)
    if (options.generatorMenu) {
      routes = this.sortRoutes(routes)
      this.userMenu = this.generatorMenu(routes)
      this.saveUserMenu()
      this.saveRouteHistory()
      if (options.flatRoutes) {
        routes = this.flatRoutes(routes)
      }
      this.originRoutes = routes
    } else {
      this.setPathKeyToRouteMap(routes)
      this.originRoutes = []
    }
  }

  // map根据pathKey快速查找route
  setPathKeyToRouteMap(routes: RouteRecordRaw[], prePathKey = '') {
    routes.forEach((route) => {
      const pathKey = `${prePathKey}/${route.path}`
      this.routeMap.set(pathKey, route)
      this.setPathKeyToRouteMap(route.children || [], pathKey)
    })
  }

  // 排序
  sortRoutes(routes: RouteRecordRaw[]) {
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
  flatRoutes(originRoutes: RouteRecordRaw[]) {
    const _routes: RouteRecordRaw[] = []
    const _flatRoutesC = (routes: RouteRecordRaw[], prePath = '') => {
      routes.forEach((route) => {
        // 保证开头没有/
        const path = `${prePath}${route.path}`
        if (route.children?.length) {
          _flatRoutesC(route.children, path + '/')
        } else {
          _routes.push({
            ...route,
            path
          })
        }
      })
    }
    _flatRoutesC(originRoutes)
    return _routes
  }

  // 自动设置component => (实现深度缓存)
  // route有`children`、但没有设置component，则自动设置component = createBasicLayout()
  autoSetComponent(routes: RouteRecordRaw[], prePathKey = '') {
    return routes.map((route): RouteRecordRaw => {
      const pathKey = `${prePathKey}/${route.path}`
      return Object.assign(route, {
        component:
          route.component ??
          (route.children?.length ? createBasicLayout(pathKey) : undefined),
        children: route.children?.length
          ? this.autoSetComponent(route.children, pathKey)
          : undefined
      })
    })
  }

  // routes => menu
  generatorMenu(routes: RouteRecordRaw[], prePathKey = ''): UserMenu[] {
    return routes
      .filter(
        (route) =>
          !(route.meta?.hiddenInMenu ?? appConfig.defaultRouteMeta.hiddenInMenu)
      )
      .map((route) => {
        const pathKey = `${prePathKey}/${route.path}`
        return {
          pathKey,
          title: route.meta?.title || pathKey,
          icon: route.meta?.icon,
          link: route.meta?.link,
          children: route.children?.length
            ? this.generatorMenu(route.children, pathKey)
            : undefined
        }
      })
  }

  saveUserMenu() {
    // app.use(pinia)还没有执行
    nextTick(() => {
      const userStore = useUserStore()
      userStore.setState({
        userMenu: this.userMenu
      })
    })
  }

  saveRouteHistory() {
    nextTick(() => {
      const routerStore = useRouterStore()
      routerStore.clearRouteHistory()
      let initRouteHistory = false
      const _searchFirstRoute = (routes: UserMenu[]) => {
        if (initRouteHistory) {
          return
        }
        for (const route of routes) {
          if (!route.children?.length) {
            initRouteHistory = true
            routerStore.addRouteHistory(route.pathKey, {
              pathKey: route.pathKey,
              meta: {
                ...route
              }
            })
            return
          } else {
            _searchFirstRoute(route.children)
          }
        }
      }
      _searchFirstRoute(this.userMenu)
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

  roleMenuToOriginRoutes(roleMenu: RoleMenu[]): RouteRecordRaw[] {
    return roleMenu
      .filter((item) => this.routeMap.has(item.pathKey))
      .map((item) => {
        const routeItem = this.routeMap.get(item.pathKey)!
        const meta = routeItem.meta || {}
        return {
          ...routeItem,
          meta: {
            ...meta,
            icon: item.icon ?? meta.icon,
            title: item.title ?? meta.title,
            link: item.link ?? meta.link
          },
          children: this.roleMenuToOriginRoutes(item.children || [])
        }
      })
  }
  // 根据角色权限注册路由、生成菜单
  registeredRoutes(parentName: string | symbol, routes: RouteRecordRaw[]) {
    routes.forEach((route) => {
      router.addRoute(parentName, route)
    })
  }
}
