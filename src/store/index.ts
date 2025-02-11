import vueRouter from '@/router'
import { useRouterGuard } from '@/router/guard'
import { useServiceInterceptors } from '@/service'
import { useAppStore, useRouterStore, useUserStore } from './modules'

export const useStores = () => ({
  app: useAppStore(),
  router: useRouterStore(),
  user: useUserStore()
})

export const setupStore = () => {
  // fix: Cannot access 'useUserStore' before initialization
  useRouterGuard(vueRouter)
  useServiceInterceptors()

  const { user, app, router } = useStores()
  user.setupState()
  app.setupState()
  router.setupState()
}

// fix: hmr 未使用 useServiceInterceptors
queueMicrotask(() => {
  useServiceInterceptors()
})

export * from './modules'

export default useStores
