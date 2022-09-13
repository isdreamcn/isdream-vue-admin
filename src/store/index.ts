import { useAppStore, useRouterStore, useUserStore } from './modules'

export const useStores = () => ({
  app: useAppStore(),
  router: useRouterStore(),
  user: useUserStore()
})

export const setupStore = () => {
  const { user } = useStores()
  user.setupState()
}

export * from './modules'

export default useStores
