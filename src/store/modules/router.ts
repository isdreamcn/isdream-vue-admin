import type { RouteMeta } from 'vue-router'
import { defineStore } from 'pinia'
import { computed } from 'vue'

interface RouteHistoryItem {
  path: string
  meta: RouteMeta
}
interface RouterStore {
  keepAliveMap: Map<string, Set<string>>
  routeHistoryMap: Map<string, RouteHistoryItem>
  // 当跳转一个没有缓存的组件，需要加载动画
  needLoading: boolean
  // 是否可以关闭动画(刷新页面，请求接口获取roleMenu、注册路由时、loading禁止关闭)
  closeLoading: boolean
  // 请求api显示动画, 200ms防抖
  loading: boolean
}

export const useRouterStore = defineStore('router', {
  state: (): RouterStore => ({
    keepAliveMap: new Map(),
    routeHistoryMap: new Map(),
    needLoading: false,
    closeLoading: true,
    loading: false
  }),
  getters: {
    routeHistory(state) {
      return [...state.routeHistoryMap.values()]
    }
  },
  actions: {
    setupState() {},
    setState(state: Partial<RouterStore>) {
      if (this.loading && !(state.closeLoading || this.closeLoading)) {
        state.loading = true
      }
      this.$patch(state)
    },
    // keepAlive
    getAlive(key: string) {
      const include = this.keepAliveMap.get(key) || []
      return [...include]
    },
    addAlive(path: string, name: string) {
      let set = this.keepAliveMap.get(path)
      if (!set) {
        set = new Set<string>()
      }
      if (!set.has(name)) {
        set.add(name)
      }
      this.keepAliveMap.set(path, set)
    },
    // history
    addRouteHistory(routeHistoryItem: RouteHistoryItem) {
      if (this.routeHistoryMap.has(routeHistoryItem.path)) {
        return
      }
      this.routeHistoryMap.set(routeHistoryItem.path, routeHistoryItem)
    },
    deleteRouteHistory(path: string) {
      if (this.routeHistoryMap.has(path)) {
        this.routeHistoryMap.delete(path)
      }
    },
    clearRouteHistory() {
      this.routeHistoryMap.clear()
    }
  }
})

// 第一个路由的path(返回首页)
export const useRouteMainPath = () => {
  const routerStore = useRouterStore()
  return computed(() => routerStore.routeHistory[0]?.path)
}
