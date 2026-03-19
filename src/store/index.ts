import { useAppStore, useRouterStore, useUserStore } from './modules'

export const useStores = () => ({
  app: useAppStore(),
  router: useRouterStore(),
  user: useUserStore()
})

export const setupStore = () => {
  const { user, app, router } = useStores()
  user.setupState()
  app.setupState()
  router.setupState()
}

export * from './modules'

export default useStores
