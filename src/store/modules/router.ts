import { defineStore } from 'pinia'

interface RouterStore {
  keepAliveMap: Map<string, Set<string>>
  routeHistory: string[]
}

export const useRouterStore = defineStore('router', {
  state: (): RouterStore => ({
    keepAliveMap: new Map(),
    routeHistory: []
  }),
  getters: {},
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
    }
  }
})
