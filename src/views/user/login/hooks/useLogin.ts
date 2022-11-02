import { reactive } from 'vue'
import { verifyObj } from '@/utils'
import { useUserStore } from '@/store'

export const useLogin = () => {
  const useStore = useUserStore()

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
      useStore.login(loginForm)
    }
  }

  return {
    loginForm,
    login
  }
}
