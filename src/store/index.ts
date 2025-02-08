import vueRouter from '@/router'
import { useRouterGuard } from '@/router/guard'
import { useAppStore, useRouterStore, useUserStore } from './modules'

export const useStores = () => ({
  app: useAppStore(),
  router: useRouterStore(),
  user: useUserStore()
})

export const setupStore = () => {
  // 避免出现以下错误
  // Cannot access 'useUserStore' before initialization
  useRouterGuard(vueRouter)

  const { user, app, router } = useStores()
  user.setupState()
  app.setupState()
  router.setupState()
}

export * from './modules'

export default useStores
