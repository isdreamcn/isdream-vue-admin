<template>
  <FormWrapper ref="formRef">
    <form class="form" @submit.prevent="onSubmit">
      <div class="form__header">
        <h1 class="form__header__title">找回密码</h1>
        <div class="form__header__desc">
          已经有账户了?
          <router-link
            class="form__button-link"
            :to="{ name: appConfig.routeLoginName }"
            >返回登录</router-link
          >
        </div>
      </div>

      <div class="form__tip-unavailable">
        <div class="form__tip-unavailable__icon">⚠️</div>
        <div class="form__tip-unavailable__text">找回密码功能暂未开放</div>
      </div>

      <FormDivider />
      <FormItem
        v-model="resetForm.email"
        label="邮箱"
        type="email"
        placeholder="请正确输入你的邮箱"
        :rules="[
          (val) => !val && '请正确输入你的邮箱',
          (val) => !isEmail(val) && '邮箱格式不正确'
        ]"
      />
      <FormItem
        v-model="resetForm.emailCaptcha"
        label="邮箱验证码"
        placeholder="请输入邮箱验证码"
        :rules="[(val) => !val && '请输入邮箱验证码']"
      >
        <template #captcha>
          <CaptchaButton @click="onGetCaptcha" />
        </template>
      </FormItem>
      <FormItem
        v-model="resetForm.password"
        label="密码"
        type="password"
        placeholder="请正确输入你的密码"
        :rules="[
          (val) => !val && '请正确输入你的密码',
          (val) => !isStrongPassword(val) && '密码为8-15位(不能全是字母或数字)'
        ]"
      />
      <FormItem
        v-model="resetForm.confirmPassword"
        label="确认密码"
        type="password"
        placeholder="请输入确认密码"
        :rules="[
          (val) => !val && '请输入确认密码',
          (val) => val && resetForm.password !== val && '密码和确认密码不一致'
        ]"
      />

      <FormButton :loading="resetLoading">确认</FormButton>

      <FormResult :status="requestStatus" :message="requestMessage" />
    </form>
  </FormWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { appConfig } from '@/config'
import FormWrapper from '../components/FormWrapper.vue'
import FormDivider from '../components/FormDivider.vue'
import FormItem from '../components/FormItem.vue'
import FormButton from '../components/FormButton.vue'
import FormResult from '../components/FormResult.vue'
import CaptchaButton from '../components/CaptchaButton.vue'
import { isEmail, isStrongPassword } from '../components/formRules'
import { useResetPassword } from './useResetPassword'

const formRef = ref<InstanceType<typeof FormWrapper>>()
const onGetCaptcha = () => {
  // TODO: 发送验证码
}

const {
  resetLoading,
  resetForm,
  requestStatus,
  requestMessage,
  resetPassword
} = useResetPassword()

const onSubmit = () => {
  if (!formRef.value?.validate()) return
  resetPassword()
}
</script>

<style scoped lang="scss"></style>
