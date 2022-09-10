import { reactive } from 'vue'
import { verifyObj } from '@/utils'
import { userSignin } from '@/api/user/login'

export const useSignin = (toggleForm?: () => void) => {
  const signinForm = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const signin = () => {
    if (
      verifyObj(
        {
          username: '请输入用户名',
          email: '请输入邮箱地址',
          password: '请输入密码',
          confirmPassword(val) {
            if (val !== signinForm.password) {
              return '两次密码不同，请检查'
            }
          }
        },
        signinForm,
        (val) => val || val === 0
      )
    ) {
      userSignin(signinForm)
        .then((res) => {
          console.log(res)
          toggleForm && toggleForm()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return {
    signinForm,
    signin
  }
}
