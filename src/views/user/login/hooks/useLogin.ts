import { reactive, ref } from 'vue'
import { verifyObj } from '@/utils'
import { useUserStore } from '@/store'

export const useLogin = () => {
  const useStore = useUserStore()

  const loginLoading = ref(false)
  const loginForm = reactive({
    username: 'admin',
    password: '123456'
  })

  const login = () => {
    if (
      verifyObj(
        {
          username: '请输入用户名',
          password: '请输入密码'
        },
        loginForm,
        (val) => val || val === 0
      )
    ) {
      loginLoading.value = true
      useStore.login(loginForm).finally(() => {
        loginLoading.value = false
      })
    }
  }

  return {
    loginLoading,
    loginForm,
    login
  }
}
