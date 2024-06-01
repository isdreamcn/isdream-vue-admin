import type { RouteRecordRaw, RouteRecordName } from 'vue-router'
import type { UserMenu } from '@/store'

export interface RoutesHandlerOptions {
  setupRoutesType: 'all' | 'roleMenu' | 'permissions'
  addRouteParentName: RouteRecordName
  flatRoutes: boolean
}

// 角色菜单
export interface RoleMenu extends PartialDeep<UserMenu> {
  path: string
  children?: RoleMenu[]
}

// path => route
export type RouteMapItem = RouteRecordRaw & {
  parentNode?: RouteMapItem
  redirectNode?: RouteMapItem
}

export type RouteMap = Map<string, RouteMapItem>

export type { UserMenu } from '@/store'
