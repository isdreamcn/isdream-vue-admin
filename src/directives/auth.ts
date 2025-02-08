import type { Directive } from 'vue'
import { checkAuth } from '@/utils/methods'

/*
  const permission = 'test'
  v-auth:test
  v-auth="permission"
*/
export const auth: Directive<HTMLElement, any> = {
  mounted(el, binding) {
    const { value, arg } = binding
    const permission = value ?? arg
    if (!permission) {
      return
    }

    if (!checkAuth(permission)) {
      el.parentElement?.removeChild(el)
    }
  }
}
