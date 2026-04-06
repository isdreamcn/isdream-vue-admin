import { useUserStore } from '@/store'

// 权限校验
export const checkAuth = (
  permission: string,
  store?: ReturnType<typeof useUserStore>
) => {
  const userStore = store ?? useUserStore()
  return userStore.permissionAuth(permission)
}
