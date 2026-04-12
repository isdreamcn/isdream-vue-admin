import { reactive, ref } from 'vue'
import { useUserStore } from '@/store'
import { useRequestState } from '../composables/useRequestState'

export const useLogin = () => {
  const userStore = useUserStore()

  const loginLoading = ref(false)
  const loginForm = reactive({
    username: 'admin',
    password: '123456'
  })

  const { requestStatus, requestMessage, setRequestStatus } = useRequestState()

  const login = () => {
    if (loginLoading.value) return

    loginLoading.value = true
    setRequestStatus('pending', '服务器正在处理数据！请稍等...')

    userStore
      .login(loginForm)
      .then(() => {
        setRequestStatus('success', '我们已经验证了您的身份，正在跳转...')
      })
      .catch((err: any) => {
        setRequestStatus(
          'error',
          err?.response?.data?.message || err?.message || '验证失败...'
        )
      })
      .finally(() => {
        loginLoading.value = false
      })
  }

  return {
    loginLoading,
    loginForm,
    requestStatus,
    requestMessage,
    login
  }
}
