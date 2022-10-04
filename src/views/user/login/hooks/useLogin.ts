import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { routesHandler } from '@/router'
import { verifyObj } from '@/utils'
import { userLogin } from '@/api/user/login'
import { useUserStore } from '@/store'
import appConfig from '@/config'

export const useLogin = () => {
  const useStore = useUserStore()
  const router = useRouter()

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
      userLogin(loginForm).then(({ data }) => {
        routesHandler.useRoleMenu(data.menu)
        useStore.setState(
          {
            token: data.token,
            userInfo: data.user
          },
          {
            expires: appConfig.serviceTokenConfig.expires
          }
        )
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
