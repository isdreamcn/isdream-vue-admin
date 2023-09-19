import type { Directive } from 'vue'
import { useUserStore } from '@/store'

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

    const userStore = useUserStore()
    if (!userStore.permissionAuth(permission)) {
      el.parentElement?.removeChild(el)
    }
  }
}
