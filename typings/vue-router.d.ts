// typings.d.ts
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 显示在侧边栏、面包屑和标签栏的文字
    title?: string
    // 该页面在菜单、面包屑和标签导航处显示的图标
    icon?: string
    // 验证权限: true
    verifyAuth?: boolean
    // 外部链接
    link?: string
  }
}
