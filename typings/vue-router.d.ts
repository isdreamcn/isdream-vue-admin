// typings.d.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 显示在侧边栏、面包屑和标签栏的文字
    title?: string
    // 该页面在菜单、面包屑和标签导航处显示的图标
    icon?: string
    // 外部链接
    link?: string
    // 顺序
    sort?: number
    // `setupRoutesType === permissions`
    // `setupRoutes` 忽略 route 权限校验
    ignoreAuth?: boolean
    // 缓存
    keepAlive?: boolean
    // 不显示在菜单中
    hiddenInMenu?: boolean
    // 不显示在面包屑中
    hiddenInBread?: boolean
    // 需要加载动画
    needLoading?: boolean
    // 需要token
    needToken?: boolean
    // 需要保留路由访问记录
    needRouteHistory?: boolean
  }
}
