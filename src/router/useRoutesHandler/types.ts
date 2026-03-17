import type { RouteRecordRaw, RouteRecordNameGeneric } from 'vue-router'

export interface RoutesHandlerOptions {
  setupRoutesType: 'all' | 'roleMenu' | 'permissions'
  addRouteParentName?: RouteRecordNameGeneric
  flatRoutes: boolean
}

export interface RoleMenu {
  title?: string
  name?: string | symbol
  path: string
  icon?: string
  link?: string
  children?: RoleMenu[]
}

// path => routeData
export type RouteMapItem = {
  route: RouteRecordRaw
  parentNode?: RouteMapItem
  redirectNode?: RouteMapItem
}

export type RouteMap = Map<string, RouteMapItem>

export type { UserMenu } from '@/store'
