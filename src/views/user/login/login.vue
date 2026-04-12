<template>
  <FormWrapper ref="formRef">
    <form class="form" @submit.prevent="onSubmit">
      <div class="form__header">
        <h1 class="form__header__title">登录</h1>
        <div class="form__header__desc">
          还没有账户吗?
          <router-link class="form__button-link" :to="{ name: 'register' }"
            >在此注册</router-link
          >
        </div>
      </div>
      <FormDivider />
      <FormItem
        v-model="loginForm.username"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[(val) => !val && '请输入用户名']"
      />
      <FormItem
        v-model="loginForm.password"
        label="密码"
        type="password"
        placeholder="请正确输入你的密码"
        :rules="[(val) => !val && '请输入密码']"
      >
        <template #label-extra>
          <router-link class="form__button-link" :to="{ name: 'resetPassword' }"
            >忘记密码？</router-link
          >
        </template>
      </FormItem>

      <FormButton :loading="loginLoading">登入</FormButton>

      <div class="form__tip-accounts">
        <div class="form__tip-accounts__item">
          <span>账号: admin</span> 密码: 123456
        </div>
        <div class="form__tip-accounts__item">
          <span>账号: test</span> 密码: 123456
        </div>
      </div>

      <FormResult :status="requestStatus" :message="requestMessage" />
    </form>
  </FormWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormWrapper from '../components/FormWrapper.vue'
import FormDivider from '../components/FormDivider.vue'
import FormItem from '../components/FormItem.vue'
import FormButton from '../components/FormButton.vue'
import FormResult from '../components/FormResult.vue'
import { useLogin } from './useLogin'

const formRef = ref<InstanceType<typeof FormWrapper>>()

const { loginLoading, loginForm, requestStatus, requestMessage, login } =
  useLogin()

const onSubmit = () => {
  if (!formRef.value?.validate()) return
  login()
}
</script>

<style scoped lang="scss">
.form__tip-accounts {
  margin-top: 16px;
  padding: 12px 16px;
  border-radius: 4px;
  background-color: rgba(231, 234, 243, 0.4);

  &__item {
    font-size: 13px;
    color: #677788;
    line-height: 1.8;

    span {
      display: inline-block;
      width: 100px;
    }
  }
}
</style>
