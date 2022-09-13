import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { verifyObj } from '@/utils'
import { userLogin } from '@/api/user/login'
import { useUserStore } from '@/store'
import appConfig from '@/config'

export const useLogin = () => {
  const useStore = useUserStore()
  const router = useRouter()

  const loginForm = reactive({
    username: '',
    password: ''
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
      userLogin(loginForm).then(({ data }) => {
        useStore.setState({
          token: data.token,
          userInfo: data.user,
          userMenu: data.menu
        })
        router.push({
          name: appConfig.mainName
        })
      })
    }
  }

  return {
    loginForm,
    login
  }
}
