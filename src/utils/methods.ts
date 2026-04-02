import { useUserStore } from '@/store'

// 权限校验
export const checkAuth = (permission: string) => {
  const userStore = useUserStore()
  return userStore.permissionAuth(permission)
}
