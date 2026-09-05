import type { Directive } from 'vue'
import { checkAuth } from '@/utils'

/**
 * 按钮级权限指令：无权限时将元素从 DOM 中移除（非隐藏）
 * 用法：
 *   const permission = 'test'
 *   v-auth:test            // arg 传权限标识
 *   v-auth="permission"    // value 传权限标识，优先于 arg
 */
export const auth: Directive<HTMLElement, string | undefined> = {
  mounted(el, binding) {
    const { value, arg } = binding
    const permission = value ?? arg
    if (!permission) {
      return
    }

    if (!checkAuth(permission)) {
      el.remove()
    }
  }
}
