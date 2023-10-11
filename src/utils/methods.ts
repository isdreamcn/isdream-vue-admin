import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store'

// 组合函数
type ComposeFn<T = any> = (payload: T) => T
type ComposePause<T = any> = (result: T) => boolean

export const composeFns = <T = any>(
  fns: ComposeFn<T>[],
  pause?: ComposePause<T>
): ComposeFn<T> => {
  const length = fns.length

  return (payload) => {
    let result = length ? fns[0](payload) : payload
    if (pause && pause(result)) {
      return result
    }
    let index = 0
    while (++index < length) {
      result = fns[index](result)
      if (pause && pause(result)) {
        return result
      }
    }

    return result
  }
}

type VerifyObjTip = Record<
  string,
  string | ((val?: any, key?: string) => string | void)
>
// 校验对象
export const verifyObj = (
  tip: VerifyObjTip,
  obj: Record<string, any>,
  verifyFn = (val: any) => (val ?? false) !== false
): boolean => {
  for (const key of Object.keys(tip)) {
    const val = tip[key]
    if (typeof val === 'function') {
      const res = val(obj[key], key)
      if (res) {
        ElMessage.info(res)
        return false
      }
    } else {
      if (!verifyFn(obj[key])) {
        ElMessage.info(val)
        return false
      }
    }
  }
  return true
}

// 权限校验
export const checkAuth = (permission: string) => {
  // 权限数据不完善，暂时不进行权限判断
  // return true
  const userStore = useUserStore()
  return userStore.permissionAuth(permission)
}
