import { reactive } from 'vue'
import { verifyObj } from '@/utils'
import { userLogin } from '@/api/user/login'

export const useLogin = () => {
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
      userLogin(loginForm)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return {
    loginForm,
    login
  }
}
