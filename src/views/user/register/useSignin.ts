import { onScopeDispose, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { appConfig } from '@/config'
import { userSignin } from '@/api/user/login'
import { useRequestState } from '../composables/useRequestState'

export const useSignin = () => {
  const router = useRouter()

  const signinLoading = ref(false)
  const signinForm = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    emailCaptcha: ''
  })

  const { requestStatus, requestMessage, setRequestStatus } = useRequestState()

  let redirectTimer: ReturnType<typeof setTimeout> | undefined

  onScopeDispose(() => clearTimeout(redirectTimer))

  const signin = () => {
    if (signinLoading.value) return

    signinLoading.value = true
    setRequestStatus('pending', '服务器正在处理数据！请稍等...')

    userSignin(signinForm)
      .then(() => {
        setRequestStatus('success', '我们已经为您创建了账号，正在跳转...')
        redirectTimer = setTimeout(() => {
          router.push({ name: appConfig.routeLoginName })
        }, 1000)
      })
      .catch((err: any) => {
        setRequestStatus(
          'error',
          err?.response?.data?.message || err?.message || '注册失败...'
        )
      })
      .finally(() => {
        signinLoading.value = false
      })
  }

  return {
    signinLoading,
    signinForm,
    requestStatus,
    requestMessage,
    signin
  }
}
