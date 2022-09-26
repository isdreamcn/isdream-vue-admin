import type { RouteRecordRaw } from 'vue-router'
import type { UserMenu } from '@/store'

import { nextTick } from 'vue'
import { useUserStore, useRouterStore } from '@/store'
import appConfig from '@/config'
import router from './index'

export interface RoutesHandlerOptions {
  // 生成全部菜单，不使用权限菜单
  generatorMenu: boolean
  addRouteParentName: string
}

// 角色菜单
export interface RoleMenu extends PartialDeep<UserMenu> {
  name: string
  children?: RoleMenu[]
}

export class RoutesHandler {
  options: RoutesHandlerOptions
  originRoutes: RouteRecordRaw[] = []
  // 菜单
  userMenu: UserMenu[] = []
  // name => route
  routeMap: Map<string, RouteRecordRaw> = new Map()

  /**
   * @description: `generatorMenu` 会过滤掉`name`为空的route
   */
  constructor(routes: RouteRecordRaw[], options: RoutesHandlerOptions) {
    this.options = options
    if (options.generatorMenu) {
      routes = this.sortRoutes(routes)
      this.originRoutes = routes
      this.userMenu = this.generatorMenu(routes)
      this.saveUserMenu()
      this.saveRouteHistory()
    } else {
      this.setNameToRouteMap(routes)
      this.originRoutes = []
    }
  }

  // map根据route.name快速查找route
  setNameToRouteMap(routes: RouteRecordRaw[]) {
    routes.forEach((route) => {
      if (route.name) {
        this.routeMap.set(String(route.name), route)
      }
      this.setNameToRouteMap(route.children || [])
    })
  }

  // 排序
  sortRoutes(routes: RouteRecordRaw[]) {
    return routes
      .sort((a, b) => (a.meta?.sort || 0) - (b.meta?.sort || 0))
      .map(
        (route): RouteRecordRaw => ({
          ...route,
          children: this.sortRoutes(route.children || [])
        })
      )
  }

  // routes => menu
  generatorMenu(routes: RouteRecordRaw[]): UserMenu[] {
    return routes
      .filter(
        (route) =>
          route.name &&
          !(route.meta?.hiddenInMenu ?? appConfig.defaultRouteMeta.hiddenInMenu)
      )
      .map((route) => ({
        name: String(route.name),
        title: route.meta?.title || String(route.name),
        icon: route.meta?.icon,
        link: route.meta?.link,
        children: this.generatorMenu(route.children || [])
      }))
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
      const searchFirstRoute = (routes: UserMenu[]) => {
        if (initRouteHistory) {
          return
        }
        for (const route of routes) {
          if (!route.children?.length) {
            initRouteHistory = true
            routerStore.addRouteHistory(route.name, {
              name: route.name,
              meta: {
                ...route
              }
            })
            return
          } else {
            searchFirstRoute(route.children)
          }
        }
      }
      searchFirstRoute(this.userMenu)
    })
  }

  // 使用角色菜单
  useRoleMenu(roleMenu: RoleMenu[]) {
    if (this.options.generatorMenu) {
      console.warn('All routes have been registered')
    } else {
      this.originRoutes = this.roleMenuToOriginRoutes(roleMenu)
      this.registeredRoutes(this.options.addRouteParentName, this.originRoutes)
      this.userMenu = this.generatorMenu(this.originRoutes)
    }
    this.saveUserMenu()
    this.saveRouteHistory()
  }

  roleMenuToOriginRoutes(roleMenu: RoleMenu[]): RouteRecordRaw[] {
    return roleMenu
      .filter((item) => this.routeMap.has(item.name))
      .map((item) => {
        const routeItem = this.routeMap.get(item.name)!
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
