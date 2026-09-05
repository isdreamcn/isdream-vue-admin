import { useUserStore } from '@/store'

/** 权限校验：判断当前用户是否拥有指定权限标识，可传入 userStore 实例避免重复调用 */
export const checkAuth = (
  permission: string,
  store?: ReturnType<typeof useUserStore>
) => {
  const userStore = store ?? useUserStore()
  return userStore.permissionAuth(permission)
}
