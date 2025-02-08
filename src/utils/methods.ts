import { useUserStore } from '@/store'

// 权限校验
export const checkAuth = (permission: string) => {
  // 权限数据不完善，暂时不进行权限判断
  // return true
  const userStore = useUserStore()
  return userStore.permissionAuth(permission)
}
