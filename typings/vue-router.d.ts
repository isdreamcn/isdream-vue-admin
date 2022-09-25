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
    // 缓存
    keepAlive?: boolean
    // 顺序
    sort?: number
    // 菜单隐藏
    hiddenMenu?: boolean
  }
}
