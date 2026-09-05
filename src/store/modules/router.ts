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
    /** 路由历史列表（按访问顺序） */
    routeHistory(state) {
      return [...state.routeHistoryMap.values()]
    }
  },
  actions: {
    /** 预留空实现，与 user/app store 的启动流程保持一致 */
    setupState() {},
    /**
     * 批量更新状态：loading 锁定时强制保持 loading，
     * 防止 API 拦截器在路由注册完成前提前关闭动画
     */
    setState(state: Partial<RouterStore>) {
      if (this.loading && !this.closeLoading && !state.closeLoading) {
        state.loading = true
      }
      this.$patch(state)
    },
    /** 读取 path 对应的组件缓存名集合 */
    getAlive(key: string) {
      return [...(this.keepAliveMap.get(key) ?? [])]
    },
    /** 记录 path 下需要 keepAlive 的组件名 */
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
    /** 新增路由历史记录（path 已存在时不重复记录） */
    addRouteHistory(routeHistoryItem: RouteHistoryItem) {
      if (this.routeHistoryMap.has(routeHistoryItem.path)) {
        return
      }
      this.routeHistoryMap.set(routeHistoryItem.path, routeHistoryItem)
    },
    /** 删除指定 path 的路由历史记录 */
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

/** 第一个路由的 path（返回首页） */
export const useRouteMainPath = () => {
  const routerStore = useRouterStore()
  return computed(() => routerStore.routeHistory[0]?.path)
}
