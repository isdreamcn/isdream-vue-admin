import type { Router } from 'vue-router'
import { routesHandler } from '@/router'
import { useRouteMainPath } from '@/store'
import { appConfig } from '@/config'
import { isFunction } from '@/utils'

export const useRedirect = (router: Router) => {
  router.beforeEach((to) => {
    // 第一个路由的path(返回首页)
    if (to.name === appConfig.routeMainName) {
      return useRouteMainPath().value
    }

    const { redirect, redirectNode } =
      routesHandler.getRouteByPath(to.path) || {}

    // `flatRoutes: true` 路由扁平化，父级的`redirect`不生效
    // TIP: redirect 需要是可以访问的路由
    if (redirect) {
      return isFunction(redirect) ? redirect(to) : redirect
    }

    // to的第一个叶子节点
    if (redirectNode?.path) {
      return redirectNode?.path
    }
  })
}
