import type { RouteMeta } from 'vue-router'
import { defineStore } from 'pinia'

interface routeHistoryItem {
  pathKey: string
  meta: RouteMeta
}
interface RouterStore {
  keepAliveMap: Map<string, Set<string>>
  routeHistoryMap: Map<string, routeHistoryItem>
  // 当跳转一个没有缓存的组件，需要加载动画
  needLoading: Boolean
  // 请求api显示动画, 200ms防抖
  loading: Boolean
}

export const useRouterStore = defineStore('router', {
  state: (): RouterStore => ({
    keepAliveMap: new Map(),
    routeHistoryMap: new Map(),
    needLoading: true,
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
      this.$patch(state)
    },
    getAlive(key: string) {
      const include = this.keepAliveMap.get(key) || []
      return [...include]
    },
    addAlive(key: string, name: string) {
      let set = this.keepAliveMap.get(key)
      if (!set) {
        set = new Set<string>()
      }
      if (!set.has(name)) {
        set.add(name)
      }
      this.keepAliveMap.set(key, set)
    },
    // history
    addRouteHistory(key: string, routeHistoryItem: routeHistoryItem) {
      if (this.routeHistoryMap.has(key)) {
        return
      }
      this.routeHistoryMap.set(key, routeHistoryItem)
    },
    deleteRouteHistory(key: string) {
      if (this.routeHistoryMap.has(key)) {
        this.routeHistoryMap.delete(key)
      }
    },
    clearRouteHistory() {
      this.routeHistoryMap.clear()
    }
  }
})
