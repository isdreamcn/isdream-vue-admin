import type { Router, RouteLocationNormalized } from 'vue-router'
import { routesHandler } from '@/router'
import { useRouteMainPath } from '@/store'
import { appConfig } from '@/config'
import { isFunction } from '@/utils'

const getRoutePath = (route: RouteLocationNormalized) =>
  route.matched[route.matched.length - 1]?.path

export const useRedirect = (router: Router) => {
  router.beforeEach((to, from) => {
    // 只改变路由中的参数，路由地址不改变，页面自动刷新
    if (
      router.hasRoute('refresh') &&
      to.fullPath !== from.fullPath &&
      getRoutePath(to) === getRoutePath(from)
    ) {
      return {
        name: 'refresh',
        query: {
          fullPath: to.fullPath
        }
      }
    }

    // 第一个路由的path(返回首页)
    if (to.name === appConfig.routeMainName) {
      return useRouteMainPath().value
    }

    const { route, redirectNode } = routesHandler.getRouteByPath(to.path) || {}

    // `flatRoutes: true` 路由扁平化，父级的`redirect`不生效
    // TIP: redirect 需要是可以访问的路由
    if (route?.redirect) {
      return isFunction(route.redirect) ? route.redirect(to) : route.redirect
    }

    // to的第一个叶子节点
    if (redirectNode?.route.path) {
      return redirectNode?.route.path
    }
  })
}
