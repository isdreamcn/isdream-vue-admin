import { onScopeDispose, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { appConfig } from '@/config'
import { userResetPassword } from '@/api/user/login'
import { useRequestState } from '../composables/useRequestState'

export const useResetPassword = () => {
  const router = useRouter()

  const resetLoading = ref(false)
  const resetForm = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    emailCaptcha: ''
  })

  const { requestStatus, requestMessage, setRequestStatus } = useRequestState()

  let redirectTimer: ReturnType<typeof setTimeout> | undefined

  onScopeDispose(() => clearTimeout(redirectTimer))

  const resetPassword = () => {
    if (resetLoading.value) return

    resetLoading.value = true
    setRequestStatus('pending', '服务器正在处理数据！请稍等...')

    userResetPassword(resetForm)
      .then(() => {
        setRequestStatus('success', '我们已经为您修改了密码，正在跳转...')
        redirectTimer = setTimeout(() => {
          router.push({ name: appConfig.routeLoginName })
        }, 1000)
      })
      .catch((err: any) => {
        setRequestStatus(
          'error',
          err?.response?.data?.message || err?.message || '密码修改失败...'
        )
      })
      .finally(() => {
        resetLoading.value = false
      })
  }

  return {
    resetLoading,
    resetForm,
    requestStatus,
    requestMessage,
    resetPassword
  }
}
