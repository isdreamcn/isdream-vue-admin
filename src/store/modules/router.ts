import type { RouteMeta } from 'vue-router'
import { defineStore } from 'pinia'

interface routeHistoryItem {
  name: string
  meta: RouteMeta
}
interface RouterStore {
  keepAliveMap: Map<string, Set<string>>
  routeHistoryMap: Map<string, routeHistoryItem>
}

export const useRouterStore = defineStore('router', {
  state: (): RouterStore => ({
    keepAliveMap: new Map(),
    routeHistoryMap: new Map()
  }),
  getters: {
    routeHistory(state) {
      return [...state.routeHistoryMap.values()]
    }
  },
  actions: {
    setupState() {},
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
