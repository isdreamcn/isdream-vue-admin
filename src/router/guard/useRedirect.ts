import type { Router, RouteLocationNormalized } from 'vue-router'
import { routesHandler } from '@/router'
import { useRouteMainPath } from '@/store'
import { appConfig } from '@/config'
import { isFunction } from '@/utils'

/** 取路由匹配链上最后一级（实际渲染组件）的 path */
const getRoutePath = (route: RouteLocationNormalized) =>
  route.matched[route.matched.length - 1]?.path

/**
 * 重定向守卫：
 * - 同一路由仅参数变化时经 refresh 路由中转，实现页面刷新
 * - 进入主页时重定向到路由历史中的第一个 path（返回首页）
 * - 处理路由 redirect 配置，或将父级重定向到其第一个叶子节点
 * （flatRoutes 下父级 redirect 不生效，由 redirectNode 兜底）
 */
export const useRedirect = (router: Router) => {
  router.beforeEach((to, from) => {
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

    if (to.name === appConfig.routeMainName) {
      return useRouteMainPath().value
    }

    const { route, redirectNode } = routesHandler.getRouteByPath(to.path) || {}

    // TIP: redirect 需要是可以访问的路由
    if (route?.redirect) {
      return isFunction(route.redirect)
        ? route.redirect(to, from)
        : route.redirect
    }

    if (redirectNode?.route.path) {
      return redirectNode?.route.path
    }
  })
}
