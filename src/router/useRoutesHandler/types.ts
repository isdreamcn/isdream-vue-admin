import type { RouteRecordRaw, RouteRecordNameGeneric } from 'vue-router'

export interface RoutesHandlerOptions {
  setupRoutesType: 'all' | 'roleMenu' | 'permissions'
  addRouteParentName?: RouteRecordNameGeneric
  flatRoutes: boolean
}

export interface RoleMenu {
  title?: string
  name?: string
  path: string
  icon?: string
  link?: string
  children?: RoleMenu[]
}

// path => routeData
// key: 权限标识，取 route.name（字符串时）否则回退 route.path，
// 用于权限匹配/路由过滤，避免 path 变动导致权限重录
export type RouteMapItem = {
  route: RouteRecordRaw
  key: string
  parentNode?: RouteMapItem
  redirectNode?: RouteMapItem
}

export type RouteMap = Map<string, RouteMapItem>

export type { UserMenu } from '@/store'
